import React, { useState, useRef, useEffect } from "react";

function TodoItem(props) {
  /**
   * blk-0x00 init: global to local
   */
  const [title, setTitle] = useState(props.itemTitle);
  // blk-0x00 end

  /**
   * blk-0x01 init: useRefs
   */
  const refTitleIpt = useRef(null);

  const focusIpt = () => {
    refTitleIpt.current && refTitleIpt.current.focus();
  };
  // blk-0x01 end

  /**
   * blk-0x02 callback funcs
   */
  const toggleCheck = () => {
    props.doToggleCheck(props.id);
  };

  const onDelete = () => {
    props.delItem(props.id);
  };

  const onEdit = () => {
    props.startEdit(props.id);
    focusIpt();
  };
  const onEditComplete = () => {
    props.doEditComplete(props.id, title);
    props.endEdit(props.id);
  };
  const onEditCancel = () => {
    props.endEdit(props.id);
    setTitle(props.itemTitle);
  };
  // blk-0x02 end

  /**
   * blk-0x03 life cycle funcs
   */
  useEffect(() => {
    if (props.isEditing) {
      focusIpt();
    }
  }, [props.isEditing]);

  // blk-0x03 end

  /**
   * blk-0x04 other function
   */

  const renderBtns = () => {
    return Boolean(props.isEditing) ? (
      <>
        <button onClick={onEditComplete}>o</button>
        <button onClick={onEditCancel}>x</button>
      </>
    ) : (
      <>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>del</button>
      </>
    );
  };

  const renderTitle = () => {
    return (
      /**0705 */
      Boolean(props.isEditing) ? (
        <input
          ref={refTitleIpt}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onEditComplete();
            } else if (e.key === "Escape") {
              onEditCancel();
            }
          }}
        ></input>
      ) : (
        <label
          style={{
            textDecoration: props.isChecked ? "line-through" : "none",
            flex: "1",
          }}
        >
          {props.itemTitle}
        </label>
      )
    );
  };

  // blk-0x04 end

  return (
    <div style={{ display: "flex" }}>
      <button style={Boolean(props.isEditing) ? { visibility: "hidden" } : {}}>
        Drag block
      </button>

      <input
        style={Boolean(props.isEditing) ? { visibility: "hidden" } : {}}
        onChange={toggleCheck}
        checked={props.isChecked}
        type="checkbox"
      ></input>
      <div style={{ flex: "1" }}>{renderTitle()}</div>
      <div style={{ width: "100px" }}>{renderBtns()}</div>
    </div>
  );
}

export default TodoItem;
