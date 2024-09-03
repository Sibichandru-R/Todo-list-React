import { useState } from "react";
import { Navbar } from "./Components/Navbar/Navbar";
import { Sidebar } from "./Components/Sidebar/Sidebar";
import { Todo } from "./Components/Todo/Todo";
import { Routes, Route } from "react-router-dom";
import { TodoEditor } from "./Components/TodoEditor/TodoEditor";

import "./App.scss";

function App() {
  const [sidebar, setSidebar] = useState(true);
  const [menuToggle, setMenuToggle] = useState(false);
  const [todos, setTodos] = useState([
    {
      id: "idOne",
      name: "idOne",
      todos: {
        completedTodos: [{ title: "task1", isImportant: false, due: "" }],
        incompleteTodos: [{ title: "task2", isImportant: false, due: "" }],
      },
    },
  ]);

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
        <Sidebar handleClick={handleClick} sidebar={sidebar} />
        <Routes>
          <Route
            path="/todo"
            element={
              <Todo
                handleClick={handleClick}
                sidebar={sidebar}
                markIncomplete={markIncomplete}
                markCompleted={markCompleted}
                incompleteTodos={incompleteTodos}
                completedTodos={completedTodos}
                menuToggle={menuToggle}
                setIncompleteTodos={setIncompleteTodos}
              />
            }
          />
          <Route
            path="/todo/:id"
            element={
              <Todo
                handleClick={handleClick}
                sidebar={sidebar}
                markIncomplete={markIncomplete}
                markCompleted={markCompleted}
                incompleteTodos={incompleteTodos}
                completedTodos={completedTodos}
                menuToggle={menuToggle}
                setIncompleteTodos={setIncompleteTodos}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
