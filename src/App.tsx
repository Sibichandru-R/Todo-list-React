import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { Navbar } from "./Components/Navbar/Navbar.tsx";
import { Sidebar } from "./Components/Sidebar/Sidebar.tsx";
import { Todo } from "./Components/Todo/Todo.tsx";

import "./assets/fonts/Roboto-Black.ttf";

import "./App.scss";

function App() {
  const [sidebar, setSidebar] = useState(true); 

  /**
   * @name handleClick
   * @description sets the sidebar open or close
   */
  const handleClick = ():void => {
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
              />
            }
          />
          <Route
            path="todo/:id"
            element={
              <Todo
                handleClick={handleClick}
                sidebar={sidebar}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
