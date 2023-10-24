# main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = "postgresql://postgres:example@localhost:5432/postgres"

app = FastAPI()

# SQLAlchemy setup
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Database models
class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)

Base.metadata.create_all(bind=engine)

# Pydantic model for request data
# Pydantic model for your response
class ItemResponse(BaseModel):
    id: int
    name: str
    description: str


# FastAPI endpoints
@app.post("/items/", response_model=ItemResponse)
async def create_item(item: ItemResponse):
    db_item = Item(**item.model_dump())
    with SessionLocal() as session:
        session.add(db_item)
        session.commit()
        session.refresh(db_item)
    return db_item


@app.get("/items/{item_id}", response_model=ItemResponse)
async def read_item(item_id: int):
    with SessionLocal() as session:
        item = session.query(Item).filter(Item.id == item_id).first()
        if item is None:
            raise HTTPException(status_code=404, detail="Item not found")

        # Convert the SQLAlchemy model to the Pydantic model
        item_response = ItemResponse(id=item.id, name=item.name, description=item.description)

        return item_response


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app)
