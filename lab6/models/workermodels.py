from pydantic import BaseModel
from typing import Optional

class Worker(BaseModel):
    name: str
    room: str
    department: str
    computer: str


class WorkerInDB(Worker):
    id: str


class WorkerUpdate(BaseModel):
    name: Optional[str] = None
    room: Optional[str] = None
    department: Optional[str] = None
    computer: Optional[str] = None