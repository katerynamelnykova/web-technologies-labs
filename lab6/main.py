from fastapi import FastAPI, HTTPException
from pymongo import MongoClient
from bson import ObjectId
from typing import List
from models.workermodels import Worker, WorkerInDB, WorkerUpdate


app = FastAPI()

client = MongoClient("mongodb://localhost:27017")
db = client["web-technologies-labs"]
collection = db["workers"]


def worker_serializer(worker) -> dict:
    return {
        "id": str(worker["_id"]),
        "name": worker["name"],
        "room": worker["room"],
        "department": worker["department"],
        "computer": worker["computer"],
    }

@app.get("/")
def read_root():
    return {"message": "This is a workers database API!"}


@app.get("/workers/", response_model=List[WorkerInDB])
def read_workers():
    workers = collection.find()
    return [worker_serializer(w) for w in workers]


@app.get("/workers/{worker_id}", response_model=WorkerInDB)
def read_worker(worker_id: str):
    worker = collection.find_one({"_id": ObjectId(worker_id)})
    if worker:
        return worker_serializer(worker)
    raise HTTPException(status_code=404, detail="Worker not found")


@app.post("/workers/", response_model=WorkerInDB)
def create_worker(worker: Worker):
    worker_id = collection.insert_one(worker.model_dump()).inserted_id
    created_worker = collection.find_one({"_id": worker_id})
    return worker_serializer(created_worker)


@app.patch("/workers/{worker_id}", response_model=WorkerInDB)
def update_worker(worker_id: str, worker: WorkerUpdate):
    update_data = {k: v for k, v in worker.model_dump().items() if v is not None}

    if not update_data:
        raise HTTPException(status_code=400, detail="No fields provided for update")

    result = collection.update_one(
        {"_id": ObjectId(worker_id)}, {"$set": update_data}
    )
    if result.modified_count == 1:
        updated_worker = collection.find_one({"_id": ObjectId(worker_id)})
        return worker_serializer(updated_worker)
    raise HTTPException(status_code=404, detail="Worker not found")


@app.delete("/workers/{worker_id}")
def delete_worker(worker_id: str):
    result = collection.delete_one({"_id": ObjectId(worker_id)})
    if result.deleted_count == 1:
        return {"message": "Worker deleted successfully"}
    raise HTTPException(status_code=404, detail="Worker not found")

