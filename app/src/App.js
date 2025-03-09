import logo from './logo.svg';
import './App.css';
import React, { useState, useRef, useEffect } from "react";
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
                // Boolean(props.isEditing) ?
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
                //     // Todo: isEditing evnet
                //     // https://react.dev/reference/react-dom/components/input
                //     // Ref: https://medium.com/itsoktomakemistakes/%E6%89%8B%E6%8A%8A%E6%89%8B%E6%95%99%E4%BD%A0%E4%BD%BF%E7%94%A8-react-%E5%AF%AB%E5%87%BA%E5%B8%B8%E8%A6%8B%E7%9A%84-input-%E5%85%83%E4%BB%B6-3a0326aa4fb6
                //     >
                //     </input> :
                //     <label style={{ ...itemStyle, flex: '1' }}>{props.title}</label>
            }
            {/* <div style={{ width: '100px' }}>
            {Boolean(props.isEditing) && <button onClick={editComplete}>o</button>}
            {Boolean(props.isEditing) && <button onClick={editCancel}>x</button>}
                {Boolean(!props.isEditing) && 
                    <button onClick={onEditclick}>Edit</button>
                }
                {Boolean(!props.isEditing) && <button>del</button>}
            </div> */}
        </div>
    )
}

function TodoItem(props) {
    const itemStyle = { textDecoration: props.checked ? 'line-through' : 'none' };
    const editStyle = { visibility: props.isEditing ? 'visible' : 'hidden' };
    const staticStyle = { visibility: props.isEditing ? 'hidden' : 'visible' };

    const toggleCompleteCheck = () => {
        props.setTodos(prev => {
            const newary = [...prev];
            newary[props.id] = { 
                ...newary[props.id], 
                checked: !newary[props.id].checked 
            }
            return newary;
        });
    }

    const delItem = () => {
        props.setTodos(prev => {
            const newary = prev.filter((eleInLst) => {
                return props.id !== eleInLst.id;
            });
            return newary;
        });
    }

    const toggleEdit = () => {
        props.setTodos(prev => {
            const newary = [...prev];
            newary[props.id] = { 
                ...newary[props.id], 
                isEditing: !newary[props.id].isEditing 
            }
            return newary;
        });
    }

    /**
     * 24-11-30
     * keyword
     * react children change parent state
     */
    const [isEditing, setIsEditing] = useState(false);

    const [checked, setChecked] = React.useState(false);
    /*
     * ERROR
     */
    // setChecked(props.checked);
    // checked = props.checked;

    {
        /***
         * Q: can i write css here for temp test?
         * Ref: https://styled-components.com/
         * continue wtih 241019-002
         */
    }

    // Display
    // https://tailwindcss.com/docs/display


    // const editStyle = {visibility: props.isEditing ? 'visible' : 'hidden'};
    // const editStyle = {display: props.isEditing ? 'inline' : 'none'};
    // const staticStyle = {visibility: props.isEditing ? 'hidden' : 'visible'};
    // const staticStyle = {display: props.isEditing ? 'none' : 'inline'};

    // Todo: use index
    // const trigger = () => setChecked((state) => !state);
    // const trigger = (state) => {state = !state};

    const editStart = () => {
        toggleEdit();
        focusToInput();
    }
    const editComplete = () => {
        changeTitle();
    }
    const editCancel = () => {
        toggleEdit();
        setLocalTitle(props.title);
    }
    
    const [localTitle, setLocalTitle] = useState(props.title);
    const changeTitle = () => {
        props.setTodos(prev => {
            const newary = [...prev];
            newary[props.id] = { 
                ...newary[props.id], 
                title: localTitle
            }
            return newary;
        });
        toggleEdit();
    }

    const inputRef = useRef(null);
    const focusToInput = () => {
        inputRef.current && inputRef.current.focus()
    }
    useEffect(() => {
        if(props.isEditing){
            focusToInput();
        }
    }, [props.isEditing]);
    const onEditclick = () => {
        editStart();
    }
    // default: 0, 1, 2, 3, 4
    // sts1: a, b, c
    // sts2: x, y, z
    // 0, 1, 2, 3, 4, a, b, c
    return (
        <div style={{ display: 'flex' }}>
            {
                /**
                 * 24-12-14 how to set default style and append by boolean condition
                 */
            }
            <button style={Boolean(props.isEditing) ? { visibility: "hidden" } : {}}>Drag block</button>
            <input style={Boolean(props.isEditing) ? { visibility: "hidden" } : {}}
                onChange={toggleCompleteCheck}
                checked={props.checked}
                type="checkbox">
            </input>
            {
                Boolean(props.isEditing) ?
                    <input
                        ref={inputRef}
                        type="text"
                        value={localTitle}
                        style={{ flex: '1' }}
                        onChange={
                            (e) => setLocalTitle(e.target.value)
                        }
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                editComplete();
                            }else if (e.key === 'Escape') {
                                editCancel();
                            }
                        }}
                    // Todo: isEditing evnet
                    // https://react.dev/reference/react-dom/components/input
                    // Ref: https://medium.com/itsoktomakemistakes/%E6%89%8B%E6%8A%8A%E6%89%8B%E6%95%99%E4%BD%A0%E4%BD%BF%E7%94%A8-react-%E5%AF%AB%E5%87%BA%E5%B8%B8%E8%A6%8B%E7%9A%84-input-%E5%85%83%E4%BB%B6-3a0326aa4fb6
                    >
                    </input> :
                    <label style={{ ...itemStyle, flex: '1' }}>{props.title}</label>
            }
            <div style={{ width: '100px' }}>
            {Boolean(props.isEditing) && <button onClick={editComplete}>o</button>}
            {Boolean(props.isEditing) && <button onClick={editCancel}>x</button>}
                {Boolean(!props.isEditing) && 
                    <button onClick={onEditclick}>Edit</button>
                }
                {Boolean(!props.isEditing) && <button onClick={delItem}>del</button>}
            </div>
        </div>
    )
}

function App() {

    const [title, setTitle] = useState("TodoList");

    // Todo: How to use setTodos to get data from database or file
    // Adding status for judging adding or editing
    const [todos, setTodos] = useState([
        { id:1 , title: "auto todo 1", checked: true, isEditing: false },
        { id:2 ,title: "auto todo 2", checked: false, isEditing: false },
        { id:3 ,title: "auto todo 3 to isEditing", checked: false, isEditing: true },
    ])

    // add id 
    const addItem = () => {
        setTodos([...todos, {title: "new one", checked: false, isEditing: true}]);
    }
//https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions#%E6%8F%8F%E8%BF%B0
    const doCancelAll = () => {
        setTodos(prevTodos =>

            prevTodos.map(
                (todo) => 
                    ({
                        ...todo, /* title: "auto todo 1", checked: true, isEditing: false */
                        isEditing: false
                        /** 
                         * title: "auto todo 1", checked: true, isEditing: false, isEditing: false
                         * ->
                         * title: "auto todo 1", checked: true, isEditing: false
                         * 
                         * same as:                 
                         * return {
                            title: todo.title,
                            checked: todo.checked,
                            isEditing: false,
                            }
    */

                    })
                
            )
            /*
            newary[props.index] = { 
                ...newary[props.index], 
                isEditing: !newary[props.index].isEditing 
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
                                title={todo.title}
                                checked={todo.checked} 
                                isEditing={todo.isEditing}
                                setTodos={setTodos}
                                id={todo.id}
                            />
                        )
                    )
                }
            </div>
            
            <div style={{ display: 'flex' }}>
                <button style={{ visibility: "hidden" }}>Drag block</button>
                {
                    /** 24-12-14
                     * Q:
                     * <button style={{ visibility: "hidden" }}> text decide width </button>
                     */
                }
                <button onClick={addItem}>+</button>
                <div style={{ width: '100px' }}>
                </div>
            </div>
        </div>
    );
}

export default App;
