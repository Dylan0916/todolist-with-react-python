from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


from schemas import ToDoTaskParams
import toDoListHelpers

app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5173",
    "https://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_response(data, message: str = "success"):
    return {"data": data, "message": message}


@app.get("/api/todos")
def get_to_do_list():
    to_do_list = toDoListHelpers.get_to_do_list()

    return get_response({"list": to_do_list})


@app.post("/api/todo")
def add_new_to_do_task(item: ToDoTaskParams):
    to_do_list = toDoListHelpers.add_new_to_do_task(item.task)

    return get_response({"list": to_do_list}, "添加成功")


@app.patch("/api/todo/{id}")
def edit_to_do_task_by_id(id: str, item: ToDoTaskParams):
    target_task = toDoListHelpers.edit_to_do_task_by_id(id, item.task)

    return get_response(target_task, "編輯成功")


@app.patch("/api/todo/{id}/complete")
def mark_task_as_completed_by_id(id: str):
    target_task = toDoListHelpers.mark_task_as_completed_by_id(id)

    return get_response(target_task, f"已標記 {id} completed")


@app.delete("/api/todo/{id}")
def remove_to_do_task_by_id(id):
    to_do_list = toDoListHelpers.remove_to_do_task_by_id(id)

    return get_response({"list": to_do_list}, "刪除成功")


@app.delete("/api/todos/completed")
def remove_all_completed_tasks():
    to_do_list = toDoListHelpers.remove_all_completed_tasks()

    return get_response({"list": to_do_list}, "刪除成功")


def main():
    pass


if __name__ == "__main__":
    main()
