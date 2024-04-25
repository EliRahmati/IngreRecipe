from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy import create_engine, Column, String, Boolean
from sqlalchemy.dialects.postgresql import UUID as alchemyUUID
import os
from pydantic import BaseModel
from typing import Optional
from uuid import UUID, uuid4

DATABASE_URL = os.getenv("DATABASE_URL")

Base = declarative_base()

# Database models
class RecipeDB(Base):
    __tablename__: str = "recipes"

    id = Column(alchemyUUID(as_uuid=True), primary_key=True, index=True)
    name = Column(String, index=True)
    owner = Column(alchemyUUID(as_uuid=True), index=True)
    short = Column(String)
    type = Column(String)
    description = Column(String)
    published = Column(Boolean, unique=False, default=False)


class UserDB(Base):
    __tablename__: str = "users"

    id = Column(alchemyUUID(as_uuid=True), primary_key=True, index=True)
    username = Column(String, index=True)
    full_name = Column(String)
    email = Column(String)
    password = Column(String)


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
    password: str or None = None


class RecipeResponse(BaseModel):
    id: Optional[UUID] = uuid4()
    name: str or None = None
    short: str or None = None
    type: str or None = None
    description: str or None = None
    published: bool or None = None


class UserInDB(User):
    hashed_password: str


# SQLAlchemy setup
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)
