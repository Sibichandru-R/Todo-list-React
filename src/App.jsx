import { useState } from "react";
import { Navbar } from "./Components/Navbar/Navbar";
import { Sidebar } from "./Components/Sidebar/Sidebar";
import { Todo } from "./Components/Todo/Todo";
import { Routes, Route } from "react-router-dom";
import "./assets/fonts/Roboto-Black.ttf";
import { addTodoList } from "./store/todoSlice.js";

import "./App.scss";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const [sidebar, setSidebar] = useState(true);
  const [menuToggle, setMenuToggle] = useState(false);
  const [todos, setTodos] = useState({
    custom: [
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
      {
        name: "One",
        todos: {
          completedTodos: [],
          incompleteTodos: [],
        },
      },
    ],
  });

  const handleClick = () => {
    setSidebar(!sidebar);
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
            path="todo/:id"
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
