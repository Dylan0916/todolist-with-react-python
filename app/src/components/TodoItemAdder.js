import React, { useState, useRef, useEffect } from "react";

import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
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
      <div>
        <IconButton
          size="small"
          color="primary"
          aria-label="editComplete"
          onClick={() => {
            if (title) {
              props.doAddComplete(title);
              refTitleIpt.current.value = "";
            } else {
              console.log("Input is empty");
            }
          }}
        >
          <AddIcon />
        </IconButton>
      </div>
    );
  };

  return (
    <div style={{ display: "flex" }}>
      <button style={{ visibility: "hidden" }}>Drag block</button>
      <input style={{ visibility: "hidden" }} type="checkbox"></input>
      <div style={{ flex: "1" }}>
        {
          <TextField
            size="small"
            ref={refTitleIpt}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                props.doAddComplete(title);
                refTitleIpt.current.value = "";
              }
            }}
          ></TextField>
        }
      </div>
      <div style={{ width: "100px" }}>{renderAddBtns()}</div>
    </div>
  );
}
export default TodoItemAdder;
