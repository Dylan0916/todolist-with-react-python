import logo from './logo.svg';
import './App.css';
import React, { useState, useRef, useEffect } from "react";
import TodoItem from './TodoItem';
// 241019-002: Module not found: Error: Can't resolve 'styled-components'
// import styled from 'styled-components';
// https://styled-components.com/docs/basics#installation
// status 關聯

function EditItem() {
    return (
        <div style={{ display: 'flex' }}>
            <button style={{ visibility: "hidden" }}>Drag block</button>
            <input style={{ visibility: "hidden" }}
                // onChange={toggleCompleteCheck}
                // checked={props.checked}
                type="checkbox">
            </input>
            {
                // Boolean(props.isItemEditing) ?
                //     <input
                //         ref={inputRef}
                //         type="text"
                //         value={localTitle}
                //         style={{ flex: '1' }}
                //         onChange={
                //             (e) => setLocalTitle(e.target.value)
                //         }
                //         onKeyDown={(e) => {
                //             if (e.key === 'Enter') {
                //                 editComplete();
                //             }else if (e.key === 'Escape') {
                //                 editCancel();
                //             }
                //         }}
                //     // Todo: isItemEditing evnet
                //     // https://react.dev/reference/react-dom/components/input
                //     // Ref: https://medium.com/itsoktomakemistakes/%E6%89%8B%E6%8A%8A%E6%89%8B%E6%95%99%E4%BD%A0%E4%BD%BF%E7%94%A8-react-%E5%AF%AB%E5%87%BA%E5%B8%B8%E8%A6%8B%E7%9A%84-input-%E5%85%83%E4%BB%B6-3a0326aa4fb6
                //     >
                //     </input> :
                //     <label style={{ ...itemStyle, flex: '1' }}>{props.itemTitle}</label>
            }
            {/* <div style={{ width: '100px' }}>
            {Boolean(props.isItemEditing) && <button onClick={editComplete}>o</button>}
            {Boolean(props.isItemEditing) && <button onClick={editCancel}>x</button>}
                {Boolean(!props.isItemEditing) && 
                    <button onClick={onEditclick}>Edit</button>
                }
                {Boolean(!props.isItemEditing) && <button>del</button>}
            </div> */}
        </div>
    )
}


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
    console.log("idxCnt", idxCnt)

    // add id 
    const addItem = () => {
        setTodos([...todos, {itemTitle: "new one", checked: false, isItemEditing: true}]);
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
                        /** 
                         * itemTitle: "auto todo 1", checked: true, isItemEditing: false, isItemEditing: false
                         * ->
                         * itemTitle: "auto todo 1", checked: true, isItemEditing: false
                         * 
                         * same as:                 
                         * return {
                            itemTitle: todo.itemTitle,
                            checked: todo.checked,
                            isItemEditing: false,
                            }
    */

                    })
                
            )
            /*
            newary[props.index] = { 
                ...newary[props.index], 
                isItemEditing: !newary[props.index].isItemEditing 
            }
            return newary;*/
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
                />
            </div>
            
            <div style={{ display: 'flex' }}>
                <button style={{ visibility: "hidden" }}>Drag block</button>
                {
                    /** 24-12-14
                     * Q:
                     * <button style={{ visibility: "hidden" }}> text decide width </button>
                     */
                }
                <button onClick={addItem}>s+</button>
                <div style={{ width: '100px' }}>
                </div>
            </div>
        </div>
    );
}

export default App;
