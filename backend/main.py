from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy import create_engine, Column, Integer, String, Boolean
from sqlalchemy.orm import sessionmaker, declarative_base
from uuid import UUID, uuid4
from typing import Optional, List
from sqlalchemy.dialects.postgresql import UUID as alchemyUUID


SECRET_KEY = "923900b49483a291e85f210d13cd17aff88ca79a73780e6da9121de89626cf8c"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

DATABASE_URL = "postgresql://postgres:example@localhost:5432/postgres"

# SQLAlchemy setup
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# Database models
class RecipeDB(Base):
    __tablename__: str = "recipes"

    id = Column(alchemyUUID(as_uuid=True), primary_key=True, index=True)
    name = Column(String, index=True)
    owner = Column(String, index=True)
    short = Column(String)
    description = Column(String)
    published = Column(Boolean, unique=False, default=False)


Base.metadata.create_all(bind=engine)

app = FastAPI()


db = {
    "elham":{
        "username": "elham",
        "full_name": "Elham Rahmati",
        "email": "elham.rahmati@code.berlin",
        "hashed_password": "$2b$12$pQqmBD73Xi70OMhFjK31NeJhsnkLTDsnZoHPKrRSG/yRH79iiSrfW",
        "disabled": False
    }
}


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str or None = None


class User(BaseModel):
    id: Optional[UUID] = uuid4()
    username: str or None = None
    full_name: str or None = None
    email: str or None = None
    disabled: bool or None = None


class RecipeResponse(BaseModel):
    id: Optional[UUID] = uuid4()
    name: str or None = None
    short: str or None = None
    description: str or None = None
    published: bool or None = None


class UserInDB(User):
    hashed_password: str


pwd_context = CryptContext(schemes=["bcrypt"], deprecated= "auto")
oauth_2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def get_user(db, username: str):
    if username in db:
        user_data = db[username]
        return UserInDB(**user_data)


def authentication_user(db, username: str, password: str):
    user = get_user(db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
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
    credential_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                         detail="Could not validate credentials", headers={"WWW-Authentication": "Bearer"})

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credential_exception

        token_data = TokenData(username=username)
    except JWTError:
        raise credential_exception

    user = get_user(db, username=token_data.username)
    if user is None:
        raise credential_exception

    return user


async def get_current_active_user(current_user: UserInDB = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")

    return current_user


@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authentication_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Incorrect username or password", headers={"WWW-Authentication": "Bearer"})
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.username}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}


# @app.get("/users/me/", response_model=User)
# async def read_users_me(current_user: User = Depends(get_current_active_user)):
#     return current_user
#
#
# @app.get("/users/me/items/")
# async def read_own_items(current_user: User = Depends(get_current_active_user)):
#     return [{"item_id": 1, "owner": current_user}]


@app.post("/me/recipes", response_model=RecipeResponse)
async def create_item(recipe: RecipeResponse, current_user: User = Depends(get_current_active_user)):
    del recipe.id
    db_recipe = RecipeDB(id=uuid4(), owner=current_user.id, **recipe.model_dump())
    with SessionLocal() as session:
        session.add(db_recipe)
        session.commit()
        session.refresh(db_recipe)
    return db_recipe


@app.get("/recipe/{recipe_id}", response_model=RecipeResponse)
async def read_item(recipe_id: str, current_user: User = Depends(get_current_active_user)):
    with SessionLocal() as session:
        recipe = session.query(RecipeDB).filter(RecipeDB.published).filter(RecipeDB.id == recipe_id).first()
        if recipe is None:
            raise HTTPException(status_code=404, detail="Recipe not found")

        # Convert the SQLAlchemy model to the Pydantic model
        item_response = RecipeResponse(
            id=recipe.id,
            name=recipe.name,
            short=recipe.short,
            description=recipe.description,
            published=recipe.published)

        return item_response


@app.get("/me/recipe/{recipe_id}", response_model=RecipeResponse)
async def read_item(recipe_id: str, current_user: User = Depends(get_current_active_user)):
    with SessionLocal() as session:
        recipe = session.query(RecipeDB).filter(RecipeDB.owner == current_user.id).filter(RecipeDB.id == recipe_id).first()
        if recipe is None:
            raise HTTPException(status_code=404, detail="Recipe not found")

        # Convert the SQLAlchemy model to the Pydantic model
        item_response = RecipeResponse(
            id=recipe.id,
            name=recipe.name,
            short=recipe.short,
            description=recipe.description,
            published=recipe.published)

        return item_response


@app.get("/recipes", response_model=List[RecipeResponse])
async def read_recipes():
    with SessionLocal() as session:
        recipes = session.query(RecipeDB).filter(RecipeDB.published == True)
        if recipes is None:
            raise HTTPException(status_code=404, detail="Recipe not found")

        response = []

        for recipe in recipes:
            item_response = RecipeResponse(
                id=recipe.id,
                name=recipe.name,
                short=recipe.short,
                description=recipe.description,
                published=recipe.published)
            response.append(item_response)

        return response


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app)


