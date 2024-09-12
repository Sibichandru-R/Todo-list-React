
import { useEffect, useState } from "react";
import dots from "../../assets/images/dots-horizontal.svg";
import toggle from "../../assets/images/toggle.svg";
import sort from "../../assets/images/sort.svg";
import groupLeft from "../../assets/images/group-left.svg";
import star from "../../assets/images/sidebar-body/star.svg";
import listIcon from "../../assets/images/list.svg";
import expandIcon from "../../assets/images/expand.svg";
import rightArrow from "../../assets/images/right.svg";
import checkbox from "../../assets/images/checkbox.svg";
import checkboxTick from "../../assets/images/checkbox-tick.svg";
import { Button } from "../Button/Button";
import { layouts, addTodoOptions, defaultList } from "../../constants";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addNewTodo,
  selectAll,
  toggleIscompleted,
} from "../../store/todoSlice";
import "./todo.scss";
import { TodoEditor } from "../TodoEditor/TodoEditor";

export const Todo = (props) => {
  const dispatch = useDispatch();
  let location = useLocation();
  location = location.pathname.split(":");
  location = location[location.length - 1].replaceAll("%20", " ");

  const [id, setId] = useState(parseInt(location) || "0");
  useEffect(() => {
    setId(location);
  }, [location]);
  const [currentTodoList, setCurrentTodoList] = useState(
    useSelector((state) => state.todoListSection[id])
  );

  const [data, setData] = useState(currentTodoList.todos);
  // data.map((d) => console.log(d.id));

  const [activeLayout, setActiveLayout] = useState("grid");
  const [todo, setTodo] = useState("");
  const [focus, setFocus] = useState(false);
  const [expandCompleted, setExpandCompleted] = useState(false);

  const [menuToggle, setMenuToggle] = useState(false);
  const [allTodos, setAllTodos] = useState(data?.length);

  const addTodo = () => {
    todo
      ? setFocus(false) &
        setAllTodos(allTodos + 1) &
        dispatch(
          addNewTodo({
            id: allTodos,
            sectionId: id,
            title: todo,
            due: "",
            isImportant: false,
            isCompleted: false,
            subtasks: [],
          })
        ) &
        setTodo("")
      : null;
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
  const [editId, setEditId] = useState({ id: 0, sectionId: 0 });
  const editMenuToggle = (id, sectionId) => {
    !menuToggle
      ? setMenuToggle(true) & setEditId({ id, sectionId })
      : setMenuToggle(true) & setEditId({ id, sectionId });
  };

  return (
    <>
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
              <div className="title">{currentTodoList.name}</div>
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
          {data.map((filteredTodo, todoIndex) => {
            return (
              <div className="todo-list" key={todoIndex}>
                <div
                  className="radiobtn"
                  onClick={() => markCompleted(todoIndex)}
                >
                  <Button source={checkbox} alt="check" />
                </div>
                <div
                  className="task"
                  onClick={() =>
                    editMenuToggle(filteredTodo.id, filteredTodo.sectionId)
                  }
                >
                  {filteredTodo?.title}
                </div>
                <div className="due-time">{filteredTodo?.due}</div>
                <div className="important">
                  {filteredTodo?.isImportant ? (
                    <Button source={star} alt="star" handleClick={() => null} />
                  ) : (
                    <Button source={star} alt="star" handleClick={() => null} />
                  )}
                </div>
              </div>
            );
          })}
          {/* {completedTodos && completedTodos.length > 0 ? (
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
                          onClick={(todo) => editMenuToggle(todo)}
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
          )} */}
        </div>
      </div>
      {menuToggle ? <TodoEditor editId={editId} /> : <></>}
    </>
  );
};
