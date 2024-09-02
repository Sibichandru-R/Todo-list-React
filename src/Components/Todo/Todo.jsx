import { useState } from "react";
import dots from "../../assets/dots-horizontal.svg";
import toggle from "../../assets/toggle.svg";
import sort from "../../assets/sort.svg";
import groupLeft from "../../assets/group-left.svg";
import list from "../../assets/list.svg";
import expandIcon from "../../assets/expand.svg";
import rightArrow from "../../assets/right.svg";
import { Button } from "../Button/Button";
import { layouts, addTodoOptions } from "../../constants";
import "./todo.scss";

export const Todo = (props) => {
  const [activeLayout, setActiveLayout] = useState("grid");
  const [todo, setTodo] = useState("");
  const [focus, setFocus] = useState(false);
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [expandCompleted, setExpandCompleted] = useState(false);

  const markCompleted = (todoIndex) => {
    setCompletedTodos([...completedTodos, incompleteTodos[todoIndex]]);
    incompleteTodos.splice(todoIndex, 1);
  };
  const markIncomplete = (todoIndex) => {
    setIncompleteTodos([...incompleteTodos, completedTodos[todoIndex]]);
    completedTodos.splice(todoIndex, 1);
  };
  const addTodo = () => {
    setFocus(false);
    setIncompleteTodos([
      ...incompleteTodos,
      { title: todo, due: "", isImportant: false, isCompleted: false },
    ]);
    setTodo("");
  };
  const expand = () => {
    setExpandCompleted(!expandCompleted);
  };
  const handleEnter = (event) => {
    event.key == "Enter" ? addTodo() : null;
  };
  const changeActiveLayout = () => {
    if (activeLayout == "list") setActiveLayout("grid");
    else setActiveLayout("list");
  };
  return (
    <div className="todo">
      <div className="todo-header">
        <div className="todo-title">
          {!props?.sidebar ? (
            <div className="sidebar-toggle-button">
              <Button
                source={toggle}
                alt="sidebar toggle"
                handleClick={props?.handleClick}
              />
            </div>
          ) : (
            <div className="sidebar-toggle-button">
              <Button source={list} alt="todo icon" handleClick={() => null} />
            </div>
          )}
          <div className="title-content">
            <div className="title">{props?.title ? props?.title : "Tasks"}</div>
            <div className="more-options">
              <Button
                source={dots}
                alt="more options"
                handleClick={() => {
                  return 0;
                }}
              />
            </div>
            <div className="view-options">
              {layouts.map((layout, layoutIndex) => {
                return (  
                  <div
                    key={layoutIndex}
                    className={`${layout?.name} ${
                      activeLayout == layout?.name ? "active" : ""
                    }`}
                  >
                    <Button
                      source={layout?.icon}
                      alt={layout?.name}
                      handleClick={changeActiveLayout}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="todo-options">
          <Button
            source={sort}
            alt="sort"
            handleClick={() => {
              return 0;
            }}
          />
          <Button
            source={groupLeft}
            alt="Group Left"
            handleClick={() => {
              return 0;
            }}
          />
        </div>
      </div>
      <div className="add-todo">
        <div className="input-field">
          <img src={list} width="30px" alt="" />
          <div className="input-section">
            <input
              type="text"
              value={todo}
              onChange={(event) => setTodo(event.target.value)}
              onKeyDown={(event) => handleEnter(event)}
              onFocus={() => setFocus(!focus)}
            />
          </div>
        </div>
      </div>
      {focus ? (
        <div className="add-todo-options">
          {addTodoOptions.map((option, optionIndex) => {
            return (
              <div className="todo-options" key={optionIndex}>
                <Button
                  source={option?.icon}
                  alt={option?.name}
                  handleClick={null}
                />
              </div>
            );
          })}
          <div className="add-todo-button">
            <button onClick={addTodo}> Add </button>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="todo-body">
        <div className="todo-list-header">
          <div className="radiobtn">|||</div>
          <div className="task">Title</div>
          <div className="due-time">Due Date</div>
          <div className="important">Importance</div>
        </div>
        {incompleteTodos.map((todo, todoIndex) => {
          return (
            <div className="todo-list" key={todoIndex}>
              <div
                className="radiobtn"
                onClick={() => markCompleted(todoIndex)}
              >
                {todo?.isCompleted}
              </div>
              <div className="task" onClick={editMenuToggle}>{todo?.title}</div>
              <div className="due-time">{todo?.due}</div>
              <div className="important">{todo?.isImportant}</div>
            </div>
          );
        })}
        {completedTodos.length > 0 ? (
          <div className="completed">
            <div className="completed-actions">
              <Button
                source={`${!expandCompleted ? rightArrow : expandIcon}`}
                alt="expand"
                handleClick={expand}
              />
              <p>Completed</p>
              <p className="counter">{completedTodos.length}</p>
            </div>
            {expandCompleted ? (
              <div className="completed">
                {completedTodos.map((todo, todoIndex) => {
                  return (
                    <div className="todo-list-completed" key={todoIndex}>
                      <div
                        className="radiobtn"
                        onClick={() => markIncomplete(todoIndex)}
                      >
                        {todo?.isCompleted}
                      </div>
                      <div className="task">{todo?.title}</div>
                      <div className="due-time">{todo?.due}</div>
                      <div className="important">{todo?.isImportant}</div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
