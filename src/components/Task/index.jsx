import React from "react";
import { FaTrashAlt } from "react-icons/fa";

const Task = (title, deleteTask) => {
  const title = title;

  return (
    <div className="task-card">
      <input className="check-box" type="checkbox" />
      <h3>Desafio Esparta</h3>
      <FaTrashAlt className="trash-icon" onClick={() => deleteTask(title)} />
    </div>
  );
};

export default Task;
