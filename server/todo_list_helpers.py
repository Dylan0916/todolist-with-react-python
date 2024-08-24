"""
{
    "id": 1,
    "task": "Buy milk",
    "is_completed": False
}
"""

todo_list = []
id = len(todo_list) + 1


def get_todo_list():
    return todo_list


def add_new_todo_task(task: str):
    global id
    new_task = {"id": str(id), "task": task, "is_completed": False}
    todo_list.append(new_task)
    id += 1

    return todo_list


def edit_todo_task_by_id(id: str, new_task: str):
    target_task = next((task for task in todo_list if task.get("id") == id), None)

    if not target_task:
        raise ValueError("Task not found")

    target_task["task"] = new_task

    return target_task


def mark_task_as_completed_by_id(id: str):
    target_task = next((task for task in todo_list if task.get("id") == id), None)

    if not target_task:
        raise ValueError("Task not found")

    target_task["is_completed"] = True

    return target_task


def remove_todo_task_by_id(id: str):
    global todo_list
    todo_list = list(filter(lambda task: task["id"] != id, todo_list))

    return todo_list


def remove_all_completed_tasks():
    global todo_list
    todo_list = list(filter(lambda task: task["is_completed"] is False, todo_list))

    return todo_list
