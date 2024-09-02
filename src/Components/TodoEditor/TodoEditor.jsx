import { useState } from "react";
import "./todoeditor.scss";
// import '
export const TodoEditor = (props) => {
  return (
    <div className="todo-editor">
      <div className="add-step">
        <div className="new-list">
          {/* <img src={plus} width="30px" className="icon" alt="Add new list" /> */}
          {/* <input
            type="text"
            className="content-name"
            placeholder="New List"
            onKeyDown={onEnter}
            value={listName}
            onChange={(event) => setListName(event.target.value)}
          /> */}
        </div>
      </div>
    </div>
  );
};
