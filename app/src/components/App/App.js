// import './App.css';
import React, { useState, useRef, useEffect } from "react";
import TodoItem from '../TodoItem';
import TodoItemAdder from '../TodoItemAdder';
// 241019-002: Module not found: Error: Can't resolve 'styled-components'
// import styled from 'styled-components';
// https://styled-components.com/docs/basics#installation
// status 關聯

function App() {

    const [title, setTitle] = useState("TodoList");

    // Todo: How to use setTodos to get data from database or file
    // Adding status for judging adding or editing
    const [todos, setTodos] = useState([
        { id:1 ,itemTitle: "auto todo 1", checked: true, isItemEditing: false },
        { id:2 ,itemTitle: "auto todo 2", checked: false, isItemEditing: false },
        { id:3 ,itemTitle: "auto todo 3 to isItemEditing", checked: false, isItemEditing: false },
    ])

    const [idxCnt, setIdxCnt] = useState(
        // Ask
        // Math.max(...todos.map(todo => todo.id))
        Math.max(...todos.map(todo => todo.id)) + 1
    )

    /**
     * 可共用 EndEdit 部分內容
     */
    const startEdit = (id) => {
        
        setTodos(prev => {
            const newTodos = prev.map((item) => {
                const newItem = {...item}
                newItem.isItemEditing = false;
                if (newItem.id === id){
                    newItem.isItemEditing = true;
                }
                return newItem
            })
            
            return newTodos
        });

    }

    const doEdit = (id) => {
        startEdit(id);
    }

    const doDelete = (id) => {
        setTodos(prev => {
            const newary = prev.filter((eleInLst) => {
                return id !== eleInLst.id;
            });
            return newary;
        });
    }

    const doEditComplete = (id) => {
        console.log("doEditComplete test");
        setTodos(prev => {
            const newTodos = prev.map((item) => {
                const newItem = {...item}
                if (newItem.id === id){
                    newItem.itemTitle = title
                }
                return newItem
            })

            return newTodos
        });
    }


    const doToggleCheck = (id) => {
        setTodos(prev => {
            const newTodos = prev.map((item) => {
                const newItem = {...item}
                if (newItem.id === id){
                    newItem.checked = !newItem.checked
                }
                return newItem
            })
            
            return newTodos
        });
    }

    
    const addItemNew = (title) => {
        console.log("addItemNew called")
        console.log(title)
        setIdxCnt(idxCnt + 1);
        setTodos([...todos, {id: idxCnt, itemTitle: title, checked: false, isItemEditing: false}]);
        // funcEndEdit()
        closeAllEditing();
    }
    
    // close all edit
    const closeAllEditing = () => {
        setTodos(prevTodos => {
            const newTodos = prevTodos.map((item) => {
                const newItem = {...item}
                newItem.isItemEditing = false;
                return newItem
            })

            return newTodos
        })
    }
    
//https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions#%E6%8F%8F%E8%BF%B0
    const doCancelAll = () => {
        setTodos(prevTodos =>

            prevTodos.map(
                (todo) => 
                    ({
                        ...todo, /* itemTitle: "auto todo 1", checked: true, isItemEditing: false */
                        isItemEditing: false
                    })
                
            )
        );
        
    }

    return (
        <div>
            <div id="app">{title}</div>
            <div id="toolbar">
                <button>Complete all</button>
                <button onClick={doCancelAll}>Cancel all</button>
                <button>Delete all</button>
            </div>
            <div id="todolist" style={{ width: "400px" }}>
                {
                    todos.map(
                        (todo) => (
                            <TodoItem
                                key={todo.id}
                                itemTitle={todo.itemTitle}
                                checked={todo.checked} 
                                isEditing={todo.isItemEditing}
                                setTodos={setTodos}
                                id={todo.id}
                                isaddingLine={false}
                                doEdit={doEdit}
                                doDelete={doDelete}
                                doToggleCheck={doToggleCheck}
                                doEditComplete={doEditComplete}
                            />
                        )
                    )
                }
                
                <TodoItem
                    key={"setAdding"}
                    itemTitle=""
                    checked={false} 
                    isEditing={true}
                    setTodos={()=>{}}
                    id={"setAdding"}
                    isaddingLine={true}
                    addItemNew={addItemNew}
                    doEdit={doEdit}
                    doDelete={doDelete}
                    doToggleCheck={doToggleCheck}
                    doEditComplete={doEditComplete}
                    />
                
                <TodoItemAdder
                    setTodos={setTodos}
                    addItemNew={addItemNew}
                    doEditComplete={doEditComplete}
                    />
            </div>
            
        </div>
    );
}

export default App;
