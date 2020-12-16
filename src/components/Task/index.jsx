import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

const TaskCard = ({ id, title, checked, checkItem, deleteTask }) => {
  const [checkedT, setCheckedT] = useState(checked);

  return (
    <div className="task-card">
      <input
        className="check-box"
        type="checkbox"
        onChange={(evt) => {
          setCheckedT(evt.target.checked);
          checkItem(id, evt, title);
        }}
        checked={checkedT}
      />
      <h3>{title}</h3>
      <FaTrashAlt
        className="trash-icon"
        onClick={() => deleteTask(id, title)}
      />
    </div>
  );
};

export default TaskCard;
