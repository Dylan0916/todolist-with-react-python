import React, { useState, useRef, useEffect } from "react";


function TodoItem(props) {
    const itemStyle = { textDecoration: props.checked ? 'line-through' : 'none' };
    // const editStyle = { visibility: props.isItemEditing ? 'visible' : 'hidden' };
    // const staticStyle = { visibility: props.isItemEditing ? 'hidden' : 'visible' };
    
    /**
     * blk-0x00 init: global to local 
     */
    const [title, setTitle] = useState(props.itemTitle);
    /**
     * 24-11-30
     * keyword
     * react children change parent state
     */
    // const [isEditing, setEditing] = useState(props.isItemEditing);
    const {isEditing} = props;
    console.log(isEditing)
    // blk-0x00 end

    /**
     * blk-0x01 init: useRefs
     */
    const refTitleIpt = useRef(null);
    const focusIpt = () => {
        refTitleIpt.current && refTitleIpt.current.focus()
    }
    // blk-0x01 end

    /**
     * blk-0x02 callback funcs
     */
    const toggleCheck = () => {
        
        props.setTodos(prev => {
            const newTodos = prev.map((item) => {
                const newItem = {...item}
                if (newItem.id === props.id){
                    newItem.checked = !newItem.checked
                }
                return newItem
            })
            
            return newTodos
        });
    }

    const onDelete = () => {
        props.setTodos(prev => {
            const newary = prev.filter((eleInLst) => {
                return props.id !== eleInLst.id;
            });
            return newary;
        });
    }

    const startEdit = () => {
        props.setTodos(prev => {
            const newTodos = prev.map((item) => {
                const newItem = {...item}
                newItem.isItemEditing = false;
                if (newItem.id === props.id){
                    newItem.isItemEditing = true;
                }
                return newItem
            })
            
            return newTodos
        });

        // setEditing(true);
    }

    const endEdit = () => {
        props.setTodos(prev => {
            const newTodos = prev.map((item) => {
                const newItem = {...item}
                if (newItem.id === props.id){
                    // setEditing(false);
                    // setTimeout(()=>{setEditing(false);}, 1000);
                    newItem.isItemEditing = false;
                }
                return newItem
            })
            
            return newTodos
        });
        // setEditing(false);
    }

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


    // const editStyle = {visibility: isEditing ? 'visible' : 'hidden'};
    // const editStyle = {display: isEditing ? 'inline' : 'none'};
    // const staticStyle = {visibility: isEditing ? 'hidden' : 'visible'};
    // const staticStyle = {display: isEditing ? 'none' : 'inline'};

    // Todo: use index
    // const trigger = () => setChecked((state) => !state);
    // const trigger = (state) => {state = !state};

    const onEdit = () => {
        startEdit();
        focusIpt();
    }
    const onEditComplete = () => {
        props.setTodos(prev => {
            const newTodos = prev.map((item) => {
                const newItem = {...item}
                if (newItem.id === props.id){
                    newItem.itemTitle = title
                }
                return newItem
            })

            return newTodos
        });
        endEdit();
    }
    const onEditCancel = () => {
        endEdit();
        setTitle(props.itemTitle);
    }
    // blk-0x02 end

    /**
     * blk-0x03 life cycle funcs
     */
    // useEffect(()=>{console.dir(refTitleIpt.current);}, []);
    useEffect(() => {
        if(isEditing){
            focusIpt();
        }
    }, [isEditing]);

    // useEffect(() => {
    //     setEditing(props.isItemEditing)
    // }, [props.isItemEditing]);
    // blk-0x03 end

    /**
     * blk-0x04 other function
     */
    // const cancelAllEdit = (() => {
    //     props.setTodos(prev => {
    //         const newTodos = prev.map((item) => {
    //             const newItem = {...item}
    //             console.log(newItem.onEditCancel)
    //             setTimeout(()=>{setEditing(false);}, 100);
    //             newItem.isItemEditing = false;
    //             return newItem;
    //         })
    //         return newTodos;
    //     });
    // });

    const renderBtns = () => {
        
        {/* <>
                {Boolean(props.isItemEditing) && <button onClick={onEditComplete}>o</button>}
                {Boolean(props.isItemEditing) && <button onClick={onEditCancel}>x</button>}
                {Boolean(!props.isItemEditing) && 
                    <button onClick={onEdit}>Edit</button>
                }
                {Boolean(!props.isItemEditing) && <button onClick={onDelete}>del</button>}
            </> */
        }
        {
            // {/* Function Add */}
            // {Boolean(props.isaddingLine) && <button >+</button>}
            // {/* Function Edit */}
            // {Boolean(!props.isItemEditing) && 
            //     <button onClick={onEdit}>Edit</button>
            // }
            // {/* Function Delete */}
            // {Boolean(!props.isItemEditing) && <button onClick={onDelete}>del</button>}
            // {/* Function Complete */}
            // {Boolean(props.isItemEditing) && Boolean(!props.isaddingLine) && <button onClick={onEditComplete}>o</button>}
            // {/* Function Cancel */}
            // {Boolean(props.isItemEditing) && Boolean(!props.isaddingLine) && <button onClick={onEditCancel}>x</button>}
        }
        if (Boolean(props.isaddingLine)) {
            console.log("rander + btn")
            return <button onClick={() => {
                if(title){
                    // Ask
                    props.addItemNew(title)
                    
                    // props.setTodos(prev => {
                    //     const newTodos = prev.map((item) => {
                    //         const newItem = {...item}
                    //         if (newItem.id === props.id){
                    //             newItem.itemTitle = title
                    //         }
                    //         return newItem
                    //     })

                    //     return newTodos
                    // });
                    // endEdit();
                }else{
                    console.log("Input is empty")
                }
            }}>+</button>;
        }
        else{
            return (Boolean(isEditing) ? (
                <>
                    <button onClick={onEditComplete}>o</button>
                    <button onClick={onEditCancel}>x</button>
                </>
            ) : (
                <>
                    <button onClick={onEdit}>Edit</button>
                    <button onClick={onDelete}>del</button>
                </>
            ))
        }
    };

    // blk-0x04 end

    // console.log(props.id)
    return (
        <div style={{ display: 'flex' }}>
            {
                /**
                 * 24-12-14 how to set default style and append by boolean condition
                 */
            }
            <button style={Boolean(isEditing) ? { visibility: "hidden" } : {}}>Drag block</button>
            <input style={Boolean(isEditing) ? { visibility: "hidden" } : {}}
                onChange={toggleCheck}
                checked={props.checked}
                type="checkbox">
            </input>
            {
                Boolean(isEditing) ?
                    <input
                        ref={refTitleIpt}
                        type="text"
                        value={title}
                        style={{ flex: '1' }}
                        onChange={
                            (e) => setTitle(e.target.value)
                        }
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                onEditComplete();
                            }else if (e.key === 'Escape') {
                                onEditCancel();
                            }
                        }}
                    // Todo: isEditing evnet
                    // https://react.dev/reference/react-dom/components/input
                    // Ref: https://medium.com/itsoktomakemistakes/%E6%89%8B%E6%8A%8A%E6%89%8B%E6%95%99%E4%BD%A0%E4%BD%BF%E7%94%A8-react-%E5%AF%AB%E5%87%BA%E5%B8%B8%E8%A6%8B%E7%9A%84-input-%E5%85%83%E4%BB%B6-3a0326aa4fb6
                    >
                    </input> :
                    <label style={{ ...itemStyle, flex: '1' }}>{props.itemTitle}</label>
            }
            <div style={{ width: '100px' }}>
                {/*<button onClick={cancelAllEdit}>testClick</button>*/}

                {
                    renderBtns()
                }
                
            </div>
        </div>
    )
}




export default TodoItem;