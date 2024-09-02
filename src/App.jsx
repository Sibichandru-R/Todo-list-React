import { useState } from 'react'
import { Navbar } from "./Components/Navbar/Navbar";
import { Sidebar } from "./Components/Sidebar/Sidebar";
import { Todo } from "./Components/Todo/Todo";
import {TodoEditor} from './Components/TodoEditor/TodoEditor'
import "./App.scss";

function App() {
  const [sidebar, setSidebar] = useState(true);
  const [menuToggle ,setMenuToggle] = useState(false)

  const handleClick = () => {
    setSidebar(!sidebar);
  };
  return (
    <div className="wrapper">
      <Navbar />
      <div className="content" >
        <Sidebar handleClick={handleClick} sidebar={sidebar} />
        <Todo handleClick={handleClick}  sidebar={sidebar} />
        
      </div>
    </div>
  );
}

export default App;
