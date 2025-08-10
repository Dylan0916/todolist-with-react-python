import { useState } from "react";
function KeyTestItem(props) {
  const [title, setTitle] = useState("");

  const { delKeyTestItem } = props;

  return (
    <div>
      <button onClick={delKeyTestItem}>del</button>
      <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
    </div>
  );
}
export default KeyTestItem;
