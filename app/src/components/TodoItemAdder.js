import React, { useState, useRef, useEffect } from "react";

function TodoItemAdder(props) {
  /**
   * blk-0x00 init: global to local
   */
  const [title, setTitle] = useState(props.itemTitle);

  /**
   * blk-0x01 init: useRefs
   */
  const refTitleIpt = useRef(null);

  /**
   * blk-0x04 other function
   */

  const renderAddBtns = () => {
    console.log("TodoItemAdder: render '+' btn");
    return (
      <button
        onClick={() => {
          if (title) {
            props.doAddComplete(title);
            refTitleIpt.current.value = "";
          } else {
            console.log("Input is empty");
          }
        }}
      >
        +
      </button>
    );
  };

  return (
    <div style={{ display: "flex" }}>
      <button style={{ visibility: "hidden" }}>Drag block</button>
      <input style={{ visibility: "hidden" }} type="checkbox"></input>
      <div style={{ flex: "1" }}>
        {
          <input
            ref={refTitleIpt}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                props.doAddComplete(title);
                refTitleIpt.current.value = "";
              }
            }}
          ></input>
        }
      </div>
      <div style={{ width: "100px" }}>{renderAddBtns()}</div>
    </div>
  );
}
export default TodoItemAdder;
