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

import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Typography from "@mui/material/Typography";
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
      <ListItemSecondaryAction>
        <IconButton
          size="small"
          color="primary"
          aria-label="editComplete"
          onClick={onEditComplete}
        >
          <CheckIcon />
        </IconButton>
        <IconButton
          size="small"
          color="primary"
          aria-label="editCancel"
          onClick={onEditCancel}
        >
          <CloseIcon />
        </IconButton>
      </ListItemSecondaryAction>
    ) : (
      <ListItemSecondaryAction>
        <IconButton
          size="small"
          color="primary"
          aria-label="edit"
          onClick={onEdit}
        >
          <EditIcon />
        </IconButton>

        <IconButton
          size="small"
          color="primary"
          aria-label="delete"
          onClick={onDelete}
        >
          <DeleteForeverIcon />
        </IconButton>
      </ListItemSecondaryAction>
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
        <ListItemText>
          <Typography variant="body1">{props.itemTitle}</Typography>
        </ListItemText>
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
