import { useState, useRef, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MenuIcon from "@mui/icons-material/Menu";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";

function TodoItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.id,
    });

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

  const onEdit = (event) => {
    console.log(event);
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
        <IconButton
          size="small"
          color="primary"
          aria-label="edit"
          onClick={onEditComplete}
        >
          <CheckIcon />
        </IconButton>
        <Fab
          size="small"
          color="primary"
          // aria-label="edit"
          onClick={onEditCancel}
        >
          <CloseIcon />
        </Fab>
      </>
    ) : (
      <>
        <IconButton
          size="small"
          color="primary"
          aria-label="edit"
          onClick={onEdit}
        >
          <EditIcon />
        </IconButton>

        <Fab size="small" color="primary" aria-label="edit" onClick={onDelete}>
          <DeleteForeverIcon />
        </Fab>
      </>
    );
  };

  const renderTitle = () => {
    return (
      /**0705 */
      Boolean(props.isEditing) ? (
        <TextField
          size="small"
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
        ></TextField>
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

  const dragStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const dragBtnStyle = {
    ...(Boolean(props.isEditing) ? { visibility: "hidden" } : {}),
    // cursor: "grab",
  };

  const menuProps = {
    size: "small",
    color: "primary",
    // ariaLabel: "menu", //Todo
    style: dragBtnStyle,
  };

  return (
    <div
      {...listeners}
      ref={setNodeRef}
      style={{ ...dragStyle, display: "flex" }}
    >
      <IconButton {...menuProps}>
        <MenuIcon />
      </IconButton>

      <Checkbox
        style={Boolean(props.isEditing) ? { visibility: "hidden" } : {}}
        onChange={toggleCheck}
        checked={props.isChecked}
        type="checkbox"
      ></Checkbox>

      <div style={{ flex: "1" }}>{renderTitle()}</div>
      <div style={{ width: "100px" }}>{renderBtns()}</div>
    </div>
  );
}

export default TodoItem;
