import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Component, useState } from "react";

import { Button } from "../Button/Button";
import { SidebarContent } from "../SidebarContent/SidebarContent";

import toggle from "../../assets/images/toggle.svg";
import listIcon from "../../assets/images/list.svg";
import plus from "../../assets/images/plus.svg";
import left from "../../assets/images/group-left.svg";

import { sidebarContent, sidebarFooterIcons } from "../../constants";
import { addTodoList } from "../../store/todoSlice";

import "./sidebar.scss";

/**
 *
 * @param {{handleClick:Event,
 * sidebar:boolean}} props
 * @returns {Component}
 */
export const Sidebar = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  /**
   * @name data
   * @description current state of the global state 
   *
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
   * }]}
   * }
   */
  const data = useSelector((state) => state.todoListSection);

  const [list, setList] = useState(data);

  const [listName, setListName] = useState("");
  const [isActive, setIsActive] = useState("My Day");

  /**
   * @name
   * @description dispatch a action to add an new todo list and redirect to that page
   *
   * @param {Event} event
   * @author
   */
  const onEnter = (event) => {
    event.key == "Enter"
      ? dispatch(addTodoList(listName)) &
        setList([
          ...list,
          {
            name: listName,
            todos: [],
          },
        ]) &
        navigate(`todo/:${list.length}`) &
        setIsActive(listName) &
        setListName("")
      : null;
  };

  return props.sidebar ? (
    <div className="sidebar-open">
      <div className="sidebar-header">
        <div className="sidebar-toggle-button">
          <Button source={toggle} alt="" handleClick={props.handleClick} />
        </div>
      </div>
      <div className="sidebar-body">
        {list.map((list, listIndex) => {
          return (
            <div key={listIndex}>
              {listIndex <= 4 ? (
                <div
                  className={`${
                    isActive == list.name ? "active" : ""
                  } contents`}
                  onClick={() => {
                    setIsActive(list?.name);
                    navigate(`todo/:${listIndex}`);
                  }}
                >
                  <SidebarContent
                    contentName={list?.name}
                    listId={listIndex}
                    source={sidebarContent[listIndex].icon}
                    alt={list?.name}
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
          );
        })}
        <div className="splitter"></div>
        {list.map((list, listIndex) => {
          return (
            <div key={listIndex}>
              {listIndex > 4 ? (
                <div
                  className={`${
                    isActive == list.name ? "active" : ""
                  } contents`}
                  onClick={() => {
                    setIsActive(list?.name);
                    navigate(`todo/:${listIndex}`);
                  }}
                >
                  <SidebarContent
                    contentName={list?.name}
                    listId={listIndex}
                    source={listIcon}
                    alt={list?.name}
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
          );
        })}
        <div className="add-todo">
          <div className="new-list">
            <img src={plus} width="30px" className="icon" alt="Add new list" />
            <input
              type="text"
              className="content-name"
              placeholder="New List"
              onKeyDown={onEnter}
              value={listName}
              onChange={(event) => setListName(event.target.value)}
            />
          </div>
          <div className="new-group">
            <img src={left} width="30px" className="icon" alt="" />
          </div>
        </div>
      </div>
      <div className="sidebar-footer">
        {sidebarFooterIcons.map((icon, footerIconIndex) => {
          return (
            <div className="icon" key={footerIconIndex}>
              <Button
                source={icon}
                alt=''
                handleClick={() => console.log("clicked")}
              />
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <></>
  );
};
