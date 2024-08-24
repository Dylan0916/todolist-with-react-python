from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


from schemas import ToDoTaskParams
import todo_list_helpers

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5173",
    "https://localhost:5173",
]
app = FastAPI()

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
def get_todo_list():
    todo_list = todo_list_helpers.get_todo_list()

    return get_response({"list": todo_list})


@app.post("/api/todo")
def add_new_todo_task(item: ToDoTaskParams):
    todo_list = todo_list_helpers.add_new_todo_task(item.task)

    return get_response({"list": todo_list}, "添加成功")


@app.patch("/api/todo/{id}")
def edit_todo_task_by_id(id: str, item: ToDoTaskParams):
    target_task = todo_list_helpers.edit_todo_task_by_id(id, item.task)

    return get_response(target_task, "編輯成功")


@app.patch("/api/todo/{id}/complete")
def mark_task_as_completed_by_id(id: str):
    target_task = todo_list_helpers.mark_task_as_completed_by_id(id)

    return get_response(target_task, f"已標記 {id} completed")


@app.delete("/api/todo/{id}")
def remove_todo_task_by_id(id):
    todo_list = todo_list_helpers.remove_todo_task_by_id(id)

    return get_response({"list": todo_list}, "刪除成功")


@app.delete("/api/todos/completed")
def remove_all_completed_tasks():
    todo_list = todo_list_helpers.remove_all_completed_tasks()

    return get_response({"list": todo_list}, "刪除成功")


def main():
    pass


if __name__ == "__main__":
    main()
