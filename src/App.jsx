import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { Navbar } from "./Components/Navbar/Navbar";
import { Sidebar } from "./Components/Sidebar/Sidebar";
import { Todo } from "./Components/Todo/Todo";

import "./assets/fonts/Roboto-Black.ttf";

import "./App.scss";

function App() {
  const [sidebar, setSidebar] = useState(true);
  const [menuToggle, setMenuToggle] = useState(false);

  /**
   * @name handleClick
   * @description sets the sidebar open or close
   */
  const handleClick = () => {
    setSidebar(!sidebar);
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
                menuToggle={menuToggle}
              />
            }
          />
          <Route
            path="todo/:id"
            element={
              <Todo
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
