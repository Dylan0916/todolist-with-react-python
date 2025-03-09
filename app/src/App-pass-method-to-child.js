import logo from './logo.svg';
import './App.css';
import React, { useState, useRef, useEffect } from "react";
// 241019-002: Module not found: Error: Can't resolve 'styled-components'
// import styled from 'styled-components';
// https://styled-components.com/docs/basics#installation
// status 關聯

function TodoItem(props) {
    const itemStyle = { textDecoration: props.checked ? 'line-through' : 'none' };
    const editStyle = { visibility: props.isEditing ? 'visible' : 'hidden' };
    const staticStyle = { visibility: props.isEditing ? 'hidden' : 'visible' };

    const toggleCompleteCheck = () => {
        props.setTodos(prev => {
            const newary = [...prev];
            newary[props.index] = { 
                ...newary[props.index], 
                checked: !newary[props.index].checked 
            }
            return newary;
        });
    }

    const toggleEdit = () => {
        props.setTodos(prev => {
            const newary = [...prev];
            newary[props.index] = { 
                ...newary[props.index], 
                isEditing: !newary[props.index].isEditing 
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

    /**
     * method 1
     */
    // const trigger = () => {props.change_check(props.index)};
    /**
     * method 2
     */
    // nothing

    console.log(props);
    
    const [localTitle, setLocalTitle] = useState(props.title);
    const changeTitle = () => {
        props.setTodos(prev => {
            const newary = [...prev];
            newary[props.index] = { 
                ...newary[props.index], 
                title: localTitle
            }
            return newary;
        });
        toggleEdit();
    }

    const inputRef = useRef(null);
    const focusOninput = () => {
        inputRef.current && inputRef.current.focus()
    }
    useEffect(() => {
        console.log("use effect run")
        if(props.isEditing){
            focusOninput();
        }
    }, [props.isEditing]);
    const onEditclick = () => {
        toggleEdit();
        
        focusOninput();
    }

    return (
        <div style={{ display: 'flex' }}>
            <button style={Boolean(props.isEditing) ? { visibility: "hidden" } : {}}>Drag block</button>
            <input style={Boolean(props.isEditing) ? { visibility: "hidden" } : {}}
                /** method 1 */
                // onChange={trigger}
                /** method 2 */
                onChange={toggleCompleteCheck}
                
                checked={props.checked}
                type="checkbox">
            </input>
            {/* <label style={itemStyle}>{props.title}</label> */}
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
                            /**
                             * 24-11-30 format string
                             */
                            console.log("A Pressed keyCode %s", e.key); 
                            console.log(`B Pressed keyCode ${e.key}`); // major usage
                            if (e.key === 'Enter') {
                                // Do code here
                                console.log("Enter Pressed");
                                /**
                                 * 24-11-30 for what?
                                 * not to do default active of browser
                                 * ex
                                 * <form submit>
                                 * will not do submit
                                 */
                                // e.preventDefault();
                                changeTitle();
                            }else if (e.key === 'Escape') {
                                // Do code here
                                console.log("Escape Pressed");
                                // e.preventDefault();

                                toggleEdit();
                                setLocalTitle(props.title);
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
            {Boolean(props.isEditing) && <button>+</button>}
            {Boolean(props.isEditing) && <button 
                onClick={ (e) =>  {
                    /**
                     * 24-11-30
                     * change plaintext to textfield
                     * key word?
                     */
                }

                }
                >dummy</button>}
                {Boolean(!props.isEditing) && 
                    <button onClick={onEditclick}>Edit</button>
                }
                {Boolean(!props.isEditing) && <button>del</button>}
            </div>
        </div>
    )
}

function App() {

    const [title, setTitle] = useState("TodoList");
    // const [todos, setTodos] = useState([]);

    // Todo: How to use setTodos to get data from database or file
    const [todos, setTodos] = useState([
        { title: "auto todo 1", checked: true, isEditing: false },
        { title: "auto todo 2", checked: false, isEditing: false },
        { title: "auto todo 3 to isEditing", checked: false, isEditing: true },
    ])
    
    /**
     * Method 1
     * @param {*} idx 
     */
    // const toggleCompleteCheck = (idx) => {
    //     setTodos(prev => {
    //         /**
    //          * js deep clone
    //          */
    //         const newary = [...prev];
    //         // newary[idx].checked = !newary[idx].checked;
    //         newary[idx] = { ...newary[idx], checked: !newary[idx].checked }
    //         console.log(newary[idx]);
    //         return newary;
    //     });
    // }
    /**
     * Method 2
     */

    return (
        <div>
            <div id="app">{title}</div>
            <div id="todolist" style={{ width: "400px" }}>
                {
                    todos.map(
                        (todo, idx) => (
                            /** 24-11-16
                             * const [isCheck, setIsCheck] = useState(false);
                             * <TodoItem title={todo.title} checked={isCheck} isEditing={todo.isEditing} onChangeCheck={setIsCheck}/>
                             */
                            <TodoItem
                                title={todo.title}
                                checked={todo.checked} 
                                isEditing={todo.isEditing}
                                // change_check={toggleCompleteCheck}
                                /**
                                 * method 2
                                 */
                                setTodos={setTodos}
                                index={idx}
                            />
                        )
                    )
                }
            </div>
        </div>
    );
}

export default App;
