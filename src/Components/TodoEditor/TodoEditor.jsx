import { useState, useEffect } from "react";
import { Button } from "../Button/Button";
import starFilled from "../../assets/images/star-filled.svg";
import plus from "../../assets/images/plus.svg";
import star from "../../assets/images/sidebar-body/star.svg";
import { addTodoOptions } from "../../constants";
import sun from "../../assets/images/sidebar-body/sun.svg";
import checkbox from "../../assets/images/checkbox.svg";
import groupLeft from "../../assets/images/group-left.svg";
import checkboxTick from "../../assets/images/checkbox-tick.svg";
import deleteIcon from "../../assets/images/delete-icon.svg";
import { useSelector, useDispatch } from "react-redux";
import { addNewSubtask, deleteTodo } from "../../store/todoSlice";
import "./todoeditor.scss";

export const TodoEditor = (props) => {
  const [todoEdit, setTodoEdit] = useState(
    useSelector(
      (state) =>
        state.todoListSection[props?.editId?.sectionId].todos[props?.editId?.id]
    )
  );

  console.log(todoEdit);
  console.log(props?.editId?.id);
  

  const [subtasks, setSubtasks] = useState(
    todoEdit.subtasks ? todoEdit.subtasks : []
  );
  const [subtaskName, setSubtaskName] = useState("");
  let index = useSelector((state) =>
    state.todoListSection[props?.editId?.sectionId].todos.findIndex(
      (todo) => todo.id == props?.editId?.id
    )
  );
  // console.log(index);
  let currentState = useSelector(
    (state) =>
      state.todoListSection[props?.editId?.sectionId].todos[props?.editId?.id]
  );
  useEffect(() => {
    setTodoEdit(currentState);
    setSubtasks(currentState.subtasks);
  }, [props?.editId?.id, currentState]);
  const dispatch = useDispatch();
  const onEnter = (event) => {
    event.key == "Enter"
      ? setSubtasks([
          ...subtasks,
          {
            todoId: props?.editId?.id,
            sectionId: props.editId?.sectionId,
            id: subtasks.length,
            subtaskTitle: subtaskName,
            isCompleted: false,
            isImportant: false,
          },
        ]) &
        dispatch(
          addNewSubtask({
            todoId: props?.editId?.id,
            sectionId: props.editId?.sectionId,
            id: subtasks.length,
            subtaskTitle: subtaskName,
            isCompleted: false,
            isImportant: false,
          })
        ) &
        setSubtaskName("")
      : null;
  };
  const toggleComplete = (subtask) => {
    console.log(subtask);
  };
  const onDelete = (_id, index) => {
    dispatch(deleteTodo({ _id, index }));
  };

  return (
    <div className="todo-editor">
      <div className="header">
        <Button source={checkboxTick} alt="alter" />
        <div
          className={`${todoEdit.isCompleted ? "completed" : ""} subtask-name`}
        >
          {todoEdit.title}
        </div>
        <Button source={star} alt="alter" />
      </div>
      <div className="subtask-body">
        {subtasks.map((subtask, index) => {
          return (
            <div key={index} className="subtasks">
              <Button
                source={checkbox}
                handleClick={() => toggleComplete(subtask)}
                alt="alter"
              />
              <div
                className={`${
                  subtask.isCompleted ? "completed" : ""
                } subtask-name`}
              >
                {subtask.subtaskTitle}
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
            handleClick={() => props.menuToggle(false)}
          />
        </div>
        <div className="icon end">
          <Button
            source={deleteIcon}
            alt={""}
            handleClick={() =>
              props.menuToggle(false) & onDelete(props?.editId, index)
            }
          />
        </div>
      </div>
    </div>
  );
};
