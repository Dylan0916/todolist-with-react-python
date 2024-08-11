from pydantic import BaseModel


class ToDoTaskParams(BaseModel):
    task: str
