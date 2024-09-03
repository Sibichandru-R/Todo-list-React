import { useState } from "react";
import { Navbar } from "./Components/Navbar/Navbar";
import { Sidebar } from "./Components/Sidebar/Sidebar";
import { Todo } from "./Components/Todo/Todo";
import { Routes, Route } from "react-router-dom";
// import { TodoEditor } from "./Components/TodoEditor/TodoEditor";

import "./App.scss";

function App() {
  const [sidebar, setSidebar] = useState(true);
  const [menuToggle, setMenuToggle] = useState(false);
  const [todos, setTodos] = useState({
    default: [
      {
        name: "My Day",
        todos: {
          completedTodos: [],
          incompleteTodos: [],
        },
      },
      {
        name: "Important",
        todos: {
          completedTodos: [],
          incompleteTodos: [],
        },
      },
      {
        name: "Planned",
        todos: {
          completedTodos: [],
          incompleteTodos: [],
        },
      },
      {
        name: "Assigned to me",
        todos: {
          completedTodos: [],
          incompleteTodos: [],
        },
      },
      {
        name: "Tasks",
        todos: {
          completedTodos: [],
          incompleteTodos: [],
        },
      },
    ],
    custom: [
      {
        name: "idOne",
        todos: {
          completedTodos: [{ title: "task1", isImportant: false, due: "" }],
          incompleteTodos: [{ title: "task2", isImportant: false, due: "" }],
        },
      },
      {
        name: "idTwo",
        todos: {
          completedTodos: [{ title: "id2task1", isImportant: false, due: "" }],
          incompleteTodos: [{ title: "id2task2", isImportant: false, due: "" }],
        },
      },
    ],
  });

  const [incompleteTodos, setIncompleteTodos] = useState([{ title: "hi" }]);
  const [completedTodos, setCompletedTodos] = useState([{ title: "hi" }]);
  const handleClick = () => {
    setSidebar(!sidebar);
  };
  const markCompleted = (todoIndex) => {
    setCompletedTodos([...completedTodos, incompleteTodos[todoIndex]]);
    incompleteTodos.splice(todoIndex, 1);
  };
  const markIncomplete = (todoIndex) => {
    setIncompleteTodos([...incompleteTodos, completedTodos[todoIndex]]);
    completedTodos.splice(todoIndex, 1);
  };

  return (
    <div className="wrapper">
      <Navbar />
      <div className="content">
        <Sidebar
          handleClick={handleClick}
          todos={todos}
          setTodos={setTodos}
          sidebar={sidebar}
        />
        <Routes>
          <Route
            path="/todo"
            element={
              <Todo
                todos={todos}
                setTodos={setTodos}
                handleClick={handleClick}
                sidebar={sidebar}
                menuToggle={menuToggle}
              />
            }
          />
          <Route
            path="/todo/:id"
            element={
              <Todo
                todos={todos}
                setTodos={setTodos}
                handleClick={handleClick}
                sidebar={sidebar}
                menuToggle={menuToggle}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
