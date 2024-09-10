import { useState } from "react";
import { Button } from "../Button/Button";
import starFilled from "../../assets/star-filled.svg";
import plus from "../../assets/plus.svg";
import star from "../../assets/sidebar-body/star.svg";
import { addTodoOptions } from "../../constants";
import sun from "../../assets/sidebar-body/sun.svg";
import checkbox from "../../assets/checkbox.svg";
import groupLeft from "../../assets/group-left.svg";
import checkboxTick from "../../assets/checkbox-tick.svg";
import deleteIcon from "../../assets/delete-icon.svg";

import "./todoeditor.scss";

export const TodoEditor = (props) => {
  const [subtasks, setSubtasks] = useState([
    { name: "task", isCompleted: false, isImportant: false },
  ]);
  const [subtaskName, setSubtaskName] = useState("");
  const onEnter = (event) => {
    event.key == "Enter"
      ? setSubtasks([
          ...subtasks,
          { name: subtaskName, isCompleted: false, isImportant: true },
        ]) & setSubtaskName("")
      : null;
  };
  const toggleComplete = (subtask) => {
    console.log(subtask);
  };

  return (
    <div className="todo-editor">
      <div className="header">
        <Button source={checkboxTick} alt="alter" />
        <div
          className={`${
            props?.todos?.isCompleted ? "completed" : ""
          } subtask-name`}
        >
          {props.name || "Task Name"}
        </div>
        <Button source={star} alt="alter" />
      </div>
      <div className="subtask-body">
        {subtasks.map((subtask, subtaskIndex) => {
          return (
            <div key={subtaskIndex} className="subtasks">
              <Button
                key={subtaskIndex}
                source={checkbox}
                alt="alter"
                handleClick={(subtaskIndex) => toggleComplete(subtaskIndex)}
              />
              <div
                className={`${
                  subtask.isCompleted ? "completed" : ""
                } subtask-name`}
              >
                {subtask.name}
              </div>
              {subtask.isImportant ? (
                <Button
                  source={starFilled}
                  alt="alter"
                  handleClick={() => {
                    subtask.isImportant = !subtask.isImportant;
                  }}
                />
              ) : (
                <Button source={star} alt="alter" />
                // handleClick={()=>{toggleImportant}}
              )}
            </div>
          );
        })}
        <div className="new-list">
          <img src={plus} width="30px" className="icon" alt="Add new list" />
          <input
            type="text"
            className="content-name"
            placeholder="New List"
            onKeyDown={onEnter}
            value={subtaskName}
            onChange={(event) => setSubtaskName(event.target.value)}
          />
        </div>
        <div className="options seperator">
          <div className="icon">
            <img width="30px" src={sun} alt="sun" />
          </div>
          <div className="content-name">Add to My Day</div>
        </div>
        {addTodoOptions.map((option, optionIndex) => {
          return (
            <div className="options" key={optionIndex}>
              <div className="icon">
                <img width="30px" src={option?.icon} alt={option?.name} />
              </div>
              <div className="content-name">{option?.name}</div>
            </div>
          );
        })}
        <div className="options seperator">
          <div className="icon">
            <img width="30px" src={sun} alt="sun" />
          </div>
          <div className="content-name">Pick a Category</div>
        </div>
        <div className="new-note ">
          <input type="text" className="note" placeholder="Add Note" />
        </div>
      </div>
      <div className="sidebar-footer">
        <div className="icon">
          <Button
            source={groupLeft}
            alt={""}
            handleClick={() => console.log("clicked")}
          />
        </div>
        <div className="icon end">
          <Button
            source={deleteIcon}
            alt={""}
            handleClick={() => console.log("clicked")}
          />
        </div>
      </div>
    </div>
  );
};
