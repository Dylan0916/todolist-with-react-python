import React, { useState, useRef, useEffect } from "react";


function TodoItem(props) {
    const itemStyle = { textDecoration: props.checked ? 'line-through' : 'none' };
    
    /**
     * blk-0x00 init: global to local 
     */
    const [title, setTitle] = useState(props.itemTitle);

    const {isEditing} = props;
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
        props.doToggleCheck(props.id)
    }

    const onDelete = () => {
        props.doDelete(props.id)
    }

    const endEdit = () => {
        props.setTodos(prev => {
            const newTodos = prev.map((item) => {
                const newItem = {...item}
                if (newItem.id === props.id){
                    newItem.isItemEditing = false;
                    // isEditing = false;
                }
                return newItem
            })
            
            return newTodos
        });
    }

    const [checked, setChecked] = React.useState(false);

    const onEdit = () => {
        /**
         * Modify
         */
        props.doEdit(props.id);
        focusIpt();
    }
    const onEditComplete = () => {
        props.doEditComplete(props.id)
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
    useEffect(() => {
        if(isEditing){
            focusIpt();
        }
    }, [isEditing]);

    // blk-0x03 end

    /**
     * blk-0x04 other function
     */

    const renderBtns = () => {
        if (Boolean(props.isaddingLine)) {
            console.log("rander + btn")
            return <button onClick={() => {
                if(title){
                    props.addItemNew(title)
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

    return (
        <div style={{ display: 'flex' }}>
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
                    >
                    </input> :
                    <label style={{ ...itemStyle, flex: '1' }}>{props.itemTitle}</label>
            }
            <div style={{ width: '100px' }}>
                {
                    renderBtns()
                }
                
            </div>
        </div>
    )
}




export default TodoItem;