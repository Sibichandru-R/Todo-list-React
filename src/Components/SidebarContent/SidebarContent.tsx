import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "./sidebarContent.scss";
import { Data } from "../../Types/types";
import { RootState } from "../../store/store";

/**
 *
 * @param {{listId:string}} props
 * @returns
 */
type Props = {
  listId: string | number;
  contentName: string;
  source: string;
  alt: string;
};
export const SidebarContent = (props: Props) => {
  const listId = props.listId;
  /**
   * @name list
   * @type {{
   * name: string,
   * todos:[
   * {id: number
   * ,sectionId: string
   * ,title: string
   * ,isCompleted: boolean
   * ,isImportant: boolean
   * ,due: date,
   *  subtasks: [{id: number
   * ,sectionId: string
   * ,todoId: number
   * ,subtaskTitle: string,
   * isCompleted: boolean
   * }]
   * }]}}
   */
  const list: Data = useSelector((state:RootState) => state.todoListSection[listId]);

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
