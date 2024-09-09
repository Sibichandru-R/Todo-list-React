import { useState } from "react";
import { Button } from "../Button/Button";
import help from "../../assets/navbar/help.svg";
import plus from "../../assets/plus.svg";
import star from "../../assets/sidebar-body/star.svg";
import { addTodoOptions } from "../../constants";
import sun from "../../assets/sidebar-body/sun.svg";
import checkbox from "../../assets/checkbox.svg";
import checkboxTick from "../../assets/checkbox-tick.svg";
import "./todoeditor.scss";
export const TodoEditor = (props) => {
  const [subtasks, setSubtasks] = useState([
    { name: "task", isCompleted: false },
  ]);
  const [subtaskName, setSubtaskName] = useState("");
  const onEnter = (event) => {
    event.key == "Enter"
      ? setSubtasks([...subtasks, { name: subtaskName, isCompleted: false }]) &
        setSubtaskName("")
      : null;
  };
  const toggleComplete = (key) => {
    console.log(key);
    console.log(subtasks[key]);
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
      {subtasks.map((subtask, subtaskIndex) => {
        return (
          <div key={subtaskIndex} className="subtasks">
            <Button
              source={checkbox}
              alt="alter"
              handleClick={(key) => toggleComplete(key)}
            />
            <div
              className={`${
                subtask.isCompleted ? "completed" : ""
              } subtask-name`}
            >
              {subtask.name}
            </div>
            <Button source={star} alt="alter" />
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
  );
};
