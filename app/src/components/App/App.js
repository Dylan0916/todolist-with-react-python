// import './App.css';
import React, { useState, useRef, useEffect, act } from "react";
import TodoItem from "../TodoItem";
import TodoItemAdder from "../TodoItemAdder";
import KeyTestItem from "../KeyTestItem";
import Button from "@mui/material/Button";

import { DndContext, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";

import { arrayMove, SortableContext } from "@dnd-kit/sortable";

import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
// 241019-002: Module not found: Error: Can't resolve 'styled-components'
// import styled from 'styled-components';
// https://styled-components.com/docs/basics#installation
// status 關聯

function App() {
  const [title, setTitle] = useState("TodoList");

  const [KeyTestList, setKeyTestList] = useState(["apple", "banana", "c"]);

  // Todo: How to use setTodos to get data from database or file
  // Adding status for judging adding or editing
  const [todos, setTodos] = useState([
    { id: 1, itemTitle: "auto todo 1", isChecked: true, isEditing: false },
    { id: 2, itemTitle: "auto todo 2", isChecked: false, isEditing: false },
    {
      id: 3,
      itemTitle: "auto todo 3 to isEditing",
      isChecked: false,
      isEditing: false,
    },
  ]);

  const idxCnt = useRef(Math.max(...todos.map((todo) => todo.id)) + 1);

  /**
   * 可共用 EndEdit 部分內容
   */
  const startEdit = (id) => {
    setTodos((prev) => {
      const newTodos = prev.map((item) => {
        const newItem = { ...item };
        if (newItem.id === id) {
          newItem.isEditing = true;
        } else {
          newItem.isEditing = false;
        }
        return newItem;
      });

      return newTodos;
    });
  };

  const delItem = (id) => {
    setTodos((prev) => {
      const newary = prev.filter((eleInLst) => {
        return id !== eleInLst.id;
      });
      return newary;
    });
  };

  const doEditComplete = (id, title) => {
    console.log("doEditComplete test", id, title);
    setTodos((prev) => {
      const newTodos = prev.map((item) => {
        const newItem = { ...item };
        if (newItem.id === id) {
          newItem.itemTitle = title;
        }
        return newItem;
      });

      return newTodos;
    });
  };

  const doToggleCheck = (id) => {
    setTodos((prev) => {
      const newTodos = prev.map((item) => {
        const newItem = { ...item };
        if (newItem.id === id) {
          newItem.isChecked = !newItem.isChecked;
        }
        return newItem;
      });

      return newTodos;
    });
  };

  const endEdit = (id) => {
    setTodos((prev) => {
      const newTodos = prev.map((item) => {
        const newItem = { ...item };
        if (newItem.id === id) {
          newItem.isEditing = false;
          // isEditing = false;
        }
        return newItem;
      });

      return newTodos;
    });
  };

  // close all edit
  const closeAllEditing = () => {
    setTodos((prevTodos) => {
      const newTodos = prevTodos.map((item) => {
        const newItem = { ...item };
        newItem.isEditing = false;
        return newItem;
      });

      return newTodos;
    });
  };

  const doAddComplete = (addingItem) => {
    console.log(" doAddComplete 001: ", idxCnt.current);
    idxCnt.current = idxCnt.current + 1;
    setTodos((prev) => {
      return [
        ...prev,
        {
          id: idxCnt.current,
          itemTitle: addingItem,
          isChecked: false,
          isEditing: false,
        },
      ];
    });
    console.log(" doAddComplete 002: ", idxCnt.current);
    closeAllEditing();
  };

  const onCheckAll = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => ({
        ...todo /* itemTitle: "auto todo 1", isChecked: true, isEditing: false */,
        isChecked: true,
      }))
    );
  };

  const onUncheckAll = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => ({
        ...todo /* itemTitle: "auto todo 1", isChecked: true, isEditing: false */,
        isChecked: false,
      }))
    );
  };

  const onDelAll = () => {
    setTodos([]);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id != over.id) {
      setTodos((item) => {
        const oldIdx = todos.findIndex((item) => item.id === active.id);
        const newIdx = todos.findIndex((item) => item.id === over.id);
        return arrayMove(todos, oldIdx, newIdx);
      });
    }
  };

  const delKeyTestItem = (refIndex) => {
    setKeyTestList((prev) => {
      const newary = prev.filter((eleInLst, index) => {
        return refIndex !== index;
      });
      return newary;
    });
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {
      // Require the mouse to move by 10 pixels before activating
      activationConstraint: {
        distance: 10,
      },
    })
  );

  return (
    <div>
      <div id="app">{title}</div>
      <div id="toolbar">
        <Button size="small" variant="outlined" onClick={onCheckAll}>
          Check all
        </Button>
        <Button size="small" variant="outlined" onClick={onUncheckAll}>
          Uncheck all
        </Button>
        <Button size="small" variant="outlined" onClick={onDelAll}>
          Delete all
        </Button>
      </div>
      <div id="todolist" style={{ width: "400px" }}>
        <List disablePadding>
          <DndContext
            sensors={sensors}
            onDragStart={() => {}}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext items={todos}>
              {todos.map((todo) => (
                <ListItem disablePadding>
                  <ListItemButton>
                    <TodoItem
                      key={todo.id}
                      itemTitle={todo.itemTitle}
                      isChecked={todo.isChecked}
                      isEditing={todo.isEditing}
                      id={todo.id}
                      startEdit={startEdit}
                      delItem={delItem}
                      doToggleCheck={doToggleCheck}
                      doEditComplete={doEditComplete}
                      endEdit={endEdit}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </SortableContext>
          </DndContext>
        </List>

        <TodoItemAdder doAddComplete={doAddComplete} />
      </div>

      <div>
        1. 調整list item 高度(文字上下置中)<br></br> 2. 對齊新增與list item
      </div>
      <div>
        {KeyTestList.map((myKeyTestList, index) => (
          <KeyTestItem
            key={index}
            delKeyTestItem={() => delKeyTestItem(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
