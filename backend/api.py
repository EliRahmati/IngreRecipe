from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from uuid import UUID, uuid4
from typing import List
import os
import logging
from models import UserDB, SessionLocal, TokenData, UserInDB, Token, User, RecipeResponse, RecipeDB

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


URL1 = os.getenv("URL1")
URL2 = os.getenv("URL2")
URL3 = os.getenv("URL3")

app = FastAPI()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated= "auto")
oauth_2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Configure logging
logging.basicConfig(level=logging.INFO)  # Set log level to INFO
logger = logging.getLogger(__name__)  # Get logger for this module

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def get_user(username: str):
    logger.info(f"get_user/username: {username}")
    with SessionLocal() as session:
        user = session.query(UserDB).filter(UserDB.username == username).first()
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")

        return user


def authentication_user(username: str, password: str):
    logger.info(f"authentication_user/username: {username}")
    user = get_user(username)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False

    return user


def create_access_token(data: dict, expires_delta: timedelta or None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(token: str = Depends(oauth_2_scheme)):
    logger.info(f"get_current_user/token: {token}")
    credential_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                         detail="Could not validate credentials", headers={"WWW-Authentication": "Bearer"})

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        logger.info(f"get_current_user/username: {username}")
        if username is None:
            raise credential_exception

        token_data = TokenData(username=username)
    except JWTError:
        logger.error(f"get_current_user/JWTError: {JWTError}")
        raise credential_exception

    user = get_user(username=token_data.username)
    if user is None:
        raise credential_exception

    return user


async def get_current_active_user(current_user: UserInDB = Depends(get_current_user)):
    logger.error(f"get_current_user/JWTError: {JWTError}")
    return current_user


@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authentication_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Incorrect username or password", headers={"WWW-Authentication": "Bearer"})
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.username}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}


@app.post("/users", response_model=User)
async def create_item(user: User):
    del user.id
    password = user.password
    hashed_pass = get_password_hash(password)
    del user.password
    db_user = UserDB(id=uuid4(), **user.model_dump(), password=hashed_pass)
    with SessionLocal() as session:
        session.add(db_user)
        session.commit()
        session.refresh(db_user)
    return db_user


@app.post("/me/recipes", response_model=RecipeResponse)
async def create_item(recipe: RecipeResponse, current_user: User = Depends(get_current_active_user)):
    del recipe.id
    db_recipe = RecipeDB(id=uuid4(), owner=current_user.id, **recipe.model_dump())
    with SessionLocal() as session:
        session.add(db_recipe)
        session.commit()
        session.refresh(db_recipe)
    return db_recipe


@app.get("/me/recipes", response_model=List[RecipeResponse])
async def read_recipes(current_user: User = Depends(get_current_active_user)):
    with SessionLocal() as session:
        recipes = session.query(RecipeDB).filter(RecipeDB.owner == current_user.id)
        if recipes is None:
            raise HTTPException(status_code=404, detail="Recipes not found")

        response = []

        for recipe in recipes:
            item_response = RecipeResponse(
                id=recipe.id,
                name=recipe.name,
                short=recipe.short,
                type=recipe.type,
                description=recipe.description,
                published=recipe.published)
            response.append(item_response)

        return response


@app.get("/recipes", response_model=List[RecipeResponse])
async def read_recipes():
    with SessionLocal() as session:
        recipes = session.query(RecipeDB).filter(RecipeDB.published == True)
        if recipes is None:
            raise HTTPException(status_code=404, detail="Recipes not found")

        response = []

        for recipe in recipes:
            item_response = RecipeResponse(
                id=recipe.id,
                name=recipe.name,
                short=recipe.short,
                type=recipe.type,
                description=recipe.description,
                published=recipe.published)
            response.append(item_response)

        return response

@app.delete("/me/recipe/{recipe_id}")
async def delete_item(recipe_id: UUID, current_user: User = Depends(get_current_active_user)):
    with SessionLocal() as session:
        recipe = session.query(RecipeDB).filter(RecipeDB.id == recipe_id).filter(RecipeDB.owner == current_user.id).first()
        if recipe is None:
            raise HTTPException(status_code=404, detail="Recipe not found")

    session.delete(recipe)
    session.commit()
    return {"message": "Item deleted"}

@app.put("/me/recipe/{recipe_id}")
async def edit_item(recipe_id: UUID, edited_recipe: RecipeResponse, current_user: User = Depends(get_current_active_user)):
    with SessionLocal() as session:
        recipe = session.query(RecipeDB).filter(RecipeDB.id == recipe_id).filter(
            RecipeDB.owner == current_user.id).first()
        if recipe is None:
            raise HTTPException(status_code=404, detail="Recipe not found")

        recipe.name = edited_recipe.name
        recipe.type = edited_recipe.type
        recipe.short = edited_recipe.short
        recipe.published = edited_recipe.published
        recipe.description = edited_recipe.description
        session.commit()
        session.refresh(recipe)
    return recipe

@app.get("/me/recipe/{recipe_id}")
async def get_item(recipe_id: UUID, current_user: User = Depends(get_current_active_user)):
    with SessionLocal() as session:
        recipe = session.query(RecipeDB).filter(RecipeDB.id == recipe_id).filter(
            RecipeDB.owner == current_user.id).first()
        if recipe is None:
            raise HTTPException(status_code=404, detail="Recipe not found")

    return recipe

@app.get("/recipe/{recipe_id}")
async def get_item(recipe_id: UUID):
    with SessionLocal() as session:
        recipe = session.query(RecipeDB).filter(RecipeDB.id == recipe_id).filter(
            RecipeDB.published == True).first()
        if recipe is None:
            raise HTTPException(status_code=404, detail="Recipe not found")

    return recipe
