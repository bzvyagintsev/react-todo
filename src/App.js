import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [todos, setTodos] = useState([
    {
      value: "test1",
      isCompleted: false
    },
    {
      value: "test2",
      isCompleted: true
    },
    {
      value: "test3",
      isCompleted: false
    }
  ]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <form className="todo">
        <ul className="todo__list">
          {todos.map((todo, i) => (
            <li className={`todo__item ${todo.isCompleted && 'todo__item--checked'}`}>
              <div
                className="todo__checkbox"
                onClick={() => toggleTodoAtIndex(i)} />
              <input
                type="text"
                className="todo__input"
                value={todo.value}
                onChange={e => handleOnChange(e, i)}
                onKeyDown={e => handleKeyDown(e, i)} />
            </li>
          ))}
        </ul>
      </form>
    </div>
  );

  function toggleTodoAtIndex(i) {
    const newTodos = [...todos];

    newTodos[i].isCompleted = !newTodos[i].isCompleted;

    setTodos(newTodos);
  }

  function handleOnChange(e, i) {
    const newTodos = [...todos];

    newTodos[i].value = e.target.value;

    setTodos(newTodos);
  }

  function handleKeyDown(e, i) {
    if (e.key === "Enter") {
      createNewTodoAtIndex(e, i)
    }

    if (e.key === "Backspace" && todos[i].value === "") {
      e.preventDefault();
      removeTodoAtIndex(e, i)
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();

      if (i + 1 === todos.length) {
        return;
      }

      setTimeout(() => {
        document.forms[0].elements[i + 1].focus();
      }, 0)
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();

      if (i === 0) {
        return;
      }

      setTimeout(() => {
        document.forms[0].elements[i - 1].focus();
      }, 0)
    }
  }

  function createNewTodoAtIndex(e, i) {
    const newTodos = [...todos];

    newTodos.splice(i + 1, 0, {
      value: "",
      isCompleted: false
    })

    setTodos(newTodos);

    setTimeout(() => {
      document.forms[0].elements[i + 1].focus();
    }, 0)
  }

  function removeTodoAtIndex(e, i) {
    if (i === 0 && todos.length === 1) {
      return;
    }

    setTodos(todos => todos.slice(0, i).concat(todos.slice(i + 1, todos.length)));

    setTimeout(() => {
      if (i === 0) {
        document.forms[0].elements[i].focus();
      } else {
        document.forms[0].elements[i - 1].focus();
      }
    }, 0)
  }
}

export default App;
