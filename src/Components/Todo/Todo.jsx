import { useEffect, useState } from "react";
import dots from "../../assets/dots-horizontal.svg";
import toggle from "../../assets/toggle.svg";
import sort from "../../assets/sort.svg";
import groupLeft from "../../assets/group-left.svg";
import star from "../../assets/sidebar-body/star.svg";
import listIcon from "../../assets/list.svg";
import expandIcon from "../../assets/expand.svg";
import rightArrow from "../../assets/right.svg";
import checkbox from "../../assets/checkbox.svg";
import checkboxTick from "../../assets/checkbox-tick.svg";
import { Button } from "../Button/Button";
// import { ToastContainer, toast } from "react-toastify";
import { layouts, addTodoOptions, defaultList } from "../../constants";
import { useLocation } from "react-router-dom";

import "./todo.scss";
import { TodoEditor } from "../TodoEditor/TodoEditor";

export const Todo = (props) => {
  let location = useLocation();
  location = location.pathname.split(":");
  location = location[location.length - 1].replaceAll("%20", " ");
  
  const [id, setId] = useState(location);
  useEffect(() => {
    setId(location);
  }, [location]);

  const [data, setData] = useState(props?.todos?.custom[id]);
  useEffect(() => {
    setList(props?.todos?.custom);
    setData(props?.todos?.custom[id]);
  }, [id]);
  useEffect(() => {
    setCompletedTodos(data?.todos?.completedTodos);
    setIncompleteTodos(data?.todos?.incompleteTodos);
  }, [data]);
  const [activeLayout, setActiveLayout] = useState("grid");
  const [todo, setTodo] = useState("");
  const [focus, setFocus] = useState(false);
  const [list,setList] = useState(props?.todos?.custom);
  const [expandCompleted, setExpandCompleted] = useState(false);
  const [incompleteTodos, setIncompleteTodos] = useState([]
    // data?.todos?.incompleteTodos
  );

  const [completedTodos, setCompletedTodos] = useState([]
  );

  const [menuToggle, setMenuToggle] = useState(false);

  const markCompleted = (todoIndex) => {
    setCompletedTodos([...completedTodos, incompleteTodos[todoIndex]]);
    setIncompleteTodos(incompleteTodos);
    incompleteTodos.splice(todoIndex, 1);
  };
  const markIncomplete = (todoIndex) => {
    setIncompleteTodos([...incompleteTodos, completedTodos[todoIndex]]);
    completedTodos.splice(todoIndex, 1);
  };
  // const notify = (completed) => {
  //   completed
  //     ? toast("Marked as Completed", {
  //         position: "top-right",
  //         autoClose: 1000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //       })
  //     : toast("Marked as Incomplete", {
  //         position: "top-right",
  //         autoClose: 1000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //       });
  // };
  const addTodo = () => {
    setFocus(false);
    setIncompleteTodos([
      ...incompleteTodos,
      { title: todo, due: "", isImportant: false, isCompleted: false },
    ]);
    setTodo("");
  };
  useEffect(() => {    
    list[id].todos.completedTodos = completedTodos;
    list[id].todos.incompleteTodos = incompleteTodos;
    props?.setTodos({ custom: list });
  }, [incompleteTodos, completedTodos]);

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
  const [editTodo, setEditTodo] = useState();
  const editMenuToggle = (todo) => {
    setMenuToggle(!menuToggle);
    setEditTodo(todo);
  };

  return (
    <>
      {/* <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      /> */}
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
                <Button
                  source={listIcon}
                  alt="todo icon"
                  handleClick={() => null}
                />
              </div>
            )}
            <div className="title-content">
              <div className="title">{props?.title ? props?.title : name}</div>
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
            <img src={checkbox} width="30px" />
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
            <div className="radiobtn"> </div>
            <div className="task">Title</div>
            <div className="due-time">Due Date</div>
            <div className="important">Importance</div>
          </div>
          {incompleteTodos &&
            incompleteTodos.map((todo, todoIndex) => {
              return (
                <div className="todo-list" key={todoIndex}>
                  <div
                    className="radiobtn"
                    onClick={() => markCompleted(todoIndex)}
                  >
                    <Button source={checkbox} alt="check" />
                  </div>
                  <div className="task" onClick={() => editMenuToggle(todo)}>
                    {todo?.title}
                  </div>
                  <div className="due-time">{todo?.due}</div>
                  <div className="important">
                    {todo?.isImportant ? (
                      <Button
                        source={star}
                        alt="star"
                        handleClick={() => null}
                      />
                    ) : (
                      <Button
                        source={star}
                        alt="star"
                        handleClick={() => null}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          {completedTodos && completedTodos.length > 0 ? (
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
                          <Button source={checkboxTick} alt="check" />
                        </div>
                        <div
                          className="task"
                          onClick={() => editMenuToggle(todo)}
                        >
                          {todo?.title}
                        </div>{" "}
                        <div className="due-time">{todo?.due}</div>
                        <div className="important">
                          {todo?.isImportant ? (
                            <Button source={star} />
                          ) : (
                            <Button source={star} />
                          )}
                        </div>
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
      {menuToggle ? <TodoEditor /> : <></>}
    </>
  );
};
