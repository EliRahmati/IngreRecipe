from fastapi import FastAPI, HTTPException
from pymongo import MongoClient
from pymongo.collection import Collection
from pydantic import BaseModel
from typing import List

app = FastAPI()

# MongoDB Connection
client = MongoClient("mongodb://localhost:27017/")
db = client["mongodb"]
collection_name = "test"
collection: Collection = db[collection_name]


class Item(BaseModel):
    name: str
    description: str


@app.post("/items/", response_model=Item)
async def create_item(item: Item):
    data = item.dict()
    result = collection.insert_one(data)
    return {"id": str(result.inserted_id), **data}


@app.get("/items/", response_model=List[Item])
async def read_items():
    items = list(collection.find({}))
    return items


@app.get("/items/{item_id}", response_model=Item)
async def read_item(item_id: str):
    item = collection.find_one({"_id": item_id})
    if item:
        return item
    else:
        raise HTTPException(status_code=404, detail="Item not found")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
