import { useEffect, useState } from "react";
import "./sidebarContent.scss";

export const SidebarContent = (props) => {

  const [count, setCount] = useState(
    props?.data?.todos?.incompleteTodos.length
  );
  useEffect(() => {   
    setCount(props?.data?.todos?.incompleteTodos.length);    
  }, [props?.data?.todos.incompleteTodos,props?.data?.todos.completedTodos]);
  return (
    <div className="sidebar-content">
      <div className="icon">
        <img width="30px" src={props?.source} alt={props?.alt} />
      </div>
      <div className="content-name">{props?.contentName}</div>
      <div className="count">{count}</div>
    </div>
  );
};
