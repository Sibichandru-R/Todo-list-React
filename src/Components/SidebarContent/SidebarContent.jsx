import { useEffect, useState } from "react";
import "./sidebarContent.scss";
import { useSelector } from "react-redux";
export const SidebarContent = (props) => {
  const listId = props.listId;
  const list = useSelector((state) => state.todoListSection[listId]);

  const [count, setCount] = useState(
    list ? list["todos"].filter((l) => !l.isCompleted).length : 0
  );

  useEffect(() => {
    setCount(list ? list["todos"].filter((l) => !l.isCompleted).length : 0);
  }, [list, listId]);
  return (
    <div className="sidebar-content">
      <div className="icon">
        <img width="30px" src={props?.source} alt={props?.alt} />
      </div>
      <div className="content-name">{props?.contentName}</div>
      <div className="count">{count == 0 ? "" : count}</div>
    </div>
  );
};
