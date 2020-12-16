import "./App.css";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [add, setAdd] = useState(true);
  const [title, setTitle] = useState("Insira o título da tarefa");

  console.log(Object.entries(localStorage));
  const deleteTask = (title) => {
    if (window.removeItem(`${title}`)) {
      console.log("excluido!");
    }
  };

  const addTask = (title) => {
    localStorage.setItem(`${title}`, title);
    setAdd(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>TODO App</h1>
      </header>
      <div className="list-book">
        <div className="tasks-container">
          <div className="title-block">
            <h2>Tarefas</h2>
            <button
              onClick={() => {
                setAdd(true);
              }}
            >
              Adicionar nova
            </button>
          </div>
          <div className="tasks-block">
            <div className="task-card">
              <input className="check-box" type="checkbox" />
              <h3>Desafio Esparta</h3>
              <FaTrashAlt className="trash-icon" onClick={() => deleteTask()} />
            </div>
          </div>
        </div>
        <div className="done-container">
          <div className="title-block">
            <h2>Finalizadas</h2>
            <button>Limpar</button>
          </div>
          <div className="tasks-block">
            <div className="task-card">
              <input className="check-box" type="checkbox" />
              <h3>Desafio Esparta</h3>
              <FaTrashAlt className="trash-icon" />
            </div>
          </div>
        </div>
      </div>

      {add && (
        <div className="task-modal">
          <h3>Adicionar Tarefa</h3>
          <input type="text" value={title} />
          <button onClick={() => addTask(title)}>Adicionar</button>
        </div>
      )}
    </div>
  );
};

export default App;
