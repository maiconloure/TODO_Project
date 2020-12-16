/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import TaskCard from "./components/Task";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [add, setAdd] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    getTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage, add]);

  const getTasks = () => {
    let allTasks = [];
    for (let task of Object.entries(localStorage)) {
      allTasks.push(JSON.parse(task[1]));
    }
    if (allTasks.length > 0) {
      setTasks(allTasks);
    }
  };

  const deleteTask = (id, title) => {
    if (window.confirm(`Tem certeza que deseja remover a tarefa ${title}`)) {
      localStorage.removeItem(`${id}`);
      getTasks();
    }
  };

  const clearTasks = () => {
    if (
      window.confirm(
        "Tem certeza que deseja remover todas as tarefas finalizadas?"
      )
    ) {
      for (let task of Object.entries(localStorage)) {
        let taskJSON = JSON.parse(task[1]);
        console.log(taskJSON);
        if (taskJSON.checked) {
          localStorage.removeItem(task[0]);
        }
      }
      getTasks();
    }
  };

  const checkItem = (id, check, title) => {
    if (check.target.checked) {
      localStorage.setItem(
        `${id}`,
        `{ "id": ${id}, "title": "${title}", "checked": true }`
      );
      getTasks();
    } else {
      localStorage.setItem(
        `${id}`,
        `{ "id": ${id}, "title": "${title}", "checked": false }`
      );
      getTasks();
    }
  };

  const addTask = (title) => {
    let nextId = 1;
    if (tasks.length > 0) {
      nextId = tasks.length + 1;
    }
    localStorage.setItem(
      `${nextId}`,
      `{ "id": ${nextId}, "title": "${title}", "checked": false }`
    );
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
            {tasks.map((task, index) => {
              if (!task.checked) {
                return (
                  <TaskCard
                    id={task.id}
                    title={task.title}
                    checked={task.checked}
                    checkItem={checkItem}
                    deleteTask={deleteTask}
                    key={index}
                  />
                );
              }
            })}
          </div>
        </div>
        <div className="done-container">
          <div className="title-block">
            <h2>Finalizadas</h2>
            <button onClick={() => clearTasks()}>Limpar</button>
          </div>
          <div className="tasks-block">
            {tasks.map((task, index) => {
              if (task.checked) {
                return (
                  <TaskCard
                    id={task.id}
                    title={task.title}
                    checked={task.checked}
                    checkItem={checkItem}
                    deleteTask={deleteTask}
                    key={index}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>

      {add && (
        <div className="task-modal">
          <h3>Adicionar Tarefa</h3>
          <input
            type="text"
            value={title}
            onChange={(evt) => setTitle(evt.target.value)}
            placeholder="Insira o título da tarefa"
          />
          <button onClick={() => addTask(title)}>Adicionar</button>
        </div>
      )}
      <footer>
        <p> Made by Maicon Lourenço</p>
      </footer>
    </div>
  );
};

export default App;
