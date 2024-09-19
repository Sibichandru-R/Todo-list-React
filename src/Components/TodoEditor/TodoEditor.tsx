import { useState, useEffect, KeyboardEvent } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Button } from "../Button/Button";
import { addTodoOptions } from "../../constants.ts";
import {
  addNewSubtask,
  addNote,
  deleteTodo,
  removeSubtask,
  toggleIscompleted,
  toggleIsImportant,
  toggleSubtaskIscompleted,
} from "../../store/todoSlice";
import { Todo, Subtask, _id } from "../../Types/types.ts";

import starFilled from "../../assets/images/star-filled.svg";
import plus from "../../assets/images/plus.svg";
import star from "../../assets/images/sidebar-body/star.svg";
import sun from "../../assets/images/sidebar-body/sun.svg";
import checkbox from "../../assets/images/checkbox.svg";
import groupLeft from "../../assets/images/group-left.svg";
import checkboxTick from "../../assets/images/checkbox-tick.svg";
import deleteIcon from "../../assets/images/delete-icon.svg";
import closeIcon from "../../assets/images/close.svg";

import "./todoeditor.scss";
import { RootState } from "../../store/store.ts";
/**
 *
 * @param {{editId:{id:number, sectionId:string}}} props
 * @returns
 */
type Props = {
  editId: { sectionId: string; id: number };
  menuToggle: React.Dispatch<React.SetStateAction<boolean>>;
};
export const TodoEditor = (props: Props) => {
  const dispatch = useDispatch();
  /**
   * @name data
   * @type {{id: number
   * ,sectionId: string
   * ,title: string
   * ,isCompleted: boolean
   * ,isImportant: boolean
   * ,due: date
   * ,subtasks: [{id: number
   * ,sectionId: string
   * ,todoId: number
   * ,subtaskTitle: string,
   * isCompleted: boolean
   * }]
   * ,note:string
   * }}
   * @description data of todo that has been selected to edit
   */
  const data: Todo = useSelector(
    (state:RootState) =>
      state.todoListSection[props?.editId?.sectionId].todos[props?.editId?.id]
  );
  const [todoEdit, setTodoEdit] = useState(data);
  const [subtasks, setSubtasks] = useState(
    todoEdit.subtasks ? todoEdit.subtasks : []
  );
  const [note, setNote] = useState(todoEdit.note ? todoEdit.note : "");
  const [subtaskName, setSubtaskName] = useState("");
  /**
   * @name index
   * @type {number}
   */
  const index: number = useSelector((state:RootState) =>
    state.todoListSection[props?.editId?.sectionId].todos.findIndex(
      (todo: Todo) => todo.id == props?.editId?.id
    )
  );

  useEffect(() => {
    setTodoEdit(data);
    setSubtasks(data.subtasks);
    setNote(data.note);
  }, [props?.editId?.id, data]);

  /**
   * @name onEnter
   * @param {Event} event
   * @description capture the entered key to check 'Enter' and if 'Enter' adds the subtask to the local state and dispatch an action to update the global state
   */
  const onEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key == "Enter") {
      setSubtasks([
        ...subtasks,
        {
          todoId: props?.editId?.id,
          sectionId: props.editId?.sectionId,
          id: subtasks.length,
          subtaskTitle: subtaskName,
          isCompleted: false,
        },
      ]);
      dispatch(
        addNewSubtask({
          todoId: props?.editId?.id,
          sectionId: props.editId?.sectionId,
          id: subtasks.length,
          subtaskTitle: subtaskName,
          isCompleted: false,
        })
      );
      setSubtaskName("");
    }
    return;
  };
  /**
   * @name toggleComplete
   * @param {{id:number,
   * todoId: number,
   * sectionId:string,
   * subtaskTitle:string,
   * isCompleted:boolean,}}subtask
   * @description dispatch a action to change the completed value of a subtask
   */
  const toggleComplete = (subtask: Subtask) => {
    dispatch(toggleSubtaskIscompleted(subtask));
  };
  /**
   * @name deleteSubtask
   * @param {{id:number,
   * todoId: number,
   * sectionId:string,
   * subtaskTitle:string,
   * isCompleted:boolean,}}subtask
   * @param {number} index postion of the subtask in the array of subtasks
   * @description dispatch a action to delete a subtask
   */
  const deleteSubtask = (subtask: Subtask, index: number) => {
    dispatch(removeSubtask({ subtask, index }));
  };

  const deleteTodoHandler = () => {
    props.menuToggle(false);
    onDelete(props?.editId, index);
  };
  /**
   * @name onDelete
   * @param {{
   * todoId: number,
   * sectionId:string,}}_id
   * @param {number} index postion of the Todo in the array of Todos
   * @description dispatch a action to delete a todo
   */
  const onDelete = (_id: _id, index: number) => {
    dispatch(deleteTodo({ _id, index }));
  };
  const editNote = (_id: _id, note: string) => {
    dispatch(addNote({ _id, note }));
  };
  return (
    <div className="todo-editor">
      <div className="header">
        <Button
          source={todoEdit.isCompleted ? checkboxTick : checkbox}
          alt="Mark Completed"
          handleClick={() => {
            dispatch(toggleIscompleted(todoEdit));
          }}
        />
        <div
          className={`${todoEdit.isCompleted ? "completed" : ""} subtask-name`}
        >
          {todoEdit.title}
        </div>
        <Button
          source={todoEdit.isImportant ? starFilled : star}
          alt="Mark Important"
          handleClick={() => {
            dispatch(toggleIsImportant(todoEdit));
          }}
        />
      </div>
      <div className="subtask-body">
        {subtasks.map((subtask, index) => {
          return (
            <div key={index} className="subtasks">
              <Button
                source={subtask.isCompleted ? checkboxTick : checkbox}
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

              <Button
                source={closeIcon}
                alt="delete subtask"
                handleClick={() => deleteSubtask(subtask, index)}
              />
            </div>
          );
        })}
        <div className="new-list">
          <img src={plus} width="30px" className="icon" alt="Add new list" />
          <input
            type="text"
            className="content-name"
            placeholder="New List"
            onKeyDown={(event) => onEnter(event)}
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
        <div className="options seperator">
          <div className="icon">
            <img width="30px" src={sun} alt="sun" />
          </div>
          <div className="content-name">Add File</div>
        </div>
        <div className="new-note ">
          <input
            type="text"
            className="note"
            placeholder="Add Note"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            onBlur={() => editNote(props?.editId, note)}
          />
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
            handleClick={deleteTodoHandler}
          />
        </div>
      </div>
    </div>
  );
};
