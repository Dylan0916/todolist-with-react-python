"""
{
    "id": 1,
    "task": "Buy milk",
    "is_completed": False
}
"""

to_do_list = []
id = len(to_do_list) + 1


def get_to_do_list():
    return to_do_list


def add_new_to_do(task):
    global id
    new_task = {"id": id, "task": task, "is_completed": False}
    to_do_list.append(new_task)
    id += 1

    return to_do_list


def edit_to_do_list_by_id(id, new_task):
    target_task = next((task for task in to_do_list if task.get("id") == id), None)

    if not target_task:
        raise ValueError("Task not found")

    target_task["task"] = new_task

    return target_task


def mark_task_as_completed_by_id(id):
    target_task = next((task for task in to_do_list if task.get("id") == id), None)

    if not target_task:
        raise ValueError("Task not found")

    target_task["is_completed"] = True

    return target_task


def remove_to_do_list_by_id(id):
    global to_do_list
    to_do_list = list(filter(lambda task: task["id"] != id, to_do_list))

    return to_do_list


def remove_all_completed_tasks():
    global to_do_list
    to_do_list = list(filter(lambda task: task["is_completed"] is False, to_do_list))

    return to_do_list


def main():
    print(get_to_do_list())


if __name__ == "__main__":
    main()