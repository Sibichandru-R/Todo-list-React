import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
const d = JSON.parse(localStorage.getItem("initialTodoListState") || "");
const initialTodoListState = d
  ? d
  : [
      {
        name: "My Day",
        todos: [],
      },
      {
        name: "Important",
        todos: [],
      },
      {
        name: "Planned",
        todos: [],
      },
      {
        name: "Assigned to me",
        todos: [],
      },
      {
        name: "Tasks",
        todos: [],
      },
    ];
const todoListSlice = createSlice({
  name: "todoList",
  initialState: initialTodoListState,
  reducers: {
    addTodoList: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(newTodoListName) {
        return {
          payload: {
            name: newTodoListName,
            todos: [],
          },
        };
      },
    },
    addNewTodo: {
      reducer(state, action) {
        state[action.payload.sectionId].todos.push({
          ...action.payload,
          id: state[action.payload.sectionId].todos.length,
        });
        localStorage.setItem("initialTodoListState", JSON.stringify(state));
      },
      prepare(data) {
        return {
          payload: {
            data,
          },
        };
      },
    },
    deleteTodo: {
      reducer(state, action) {
        state[action.payload._id.sectionId].todos.splice(
          action.payload.index,
          1
        );
        localStorage.setItem("initialTodoListState", JSON.stringify(state));
      },
      prepare(data) {
        return {
          payload: {
            data,
          },
        };
      },
    },
    toggleIscompleted: {
      reducer(state, action) {
        state[action.payload.sectionId].todos[action.payload.id].isCompleted =
          !state[action.payload.sectionId].todos[action.payload.id].isCompleted;
        localStorage.setItem("initialTodoListState", JSON.stringify(state));
      },
      prepare(data) {
        return {
          payload: {
            data,
          },
        };
      },
    },
    toggleIsImportant: {
      reducer(state, action) {
        state[action.payload.sectionId].todos[action.payload.id].isImportant =
          !state[action.payload.sectionId].todos[action.payload.id].isImportant;
        localStorage.setItem("initialTodoListState", JSON.stringify(state));
      },
      prepare(data) {
        return {
          payload: {
            data,
          },
        };
      },
    },
    changeDueDate: {
      reducer(state, action) {
        state[action.payload.sectioId].todos[action.payload.id].due =
          action.payload.due;
        // console.log(action.payload)
      },
      prepare(data) {
        return {
          payload: {
            data,
          },
        };
      },
    },
    addNewSubtask: {
      reducer(state, action) {
        state[action.payload.sectionId].todos[
          action.payload.todoId
        ].subtasks.push(action.payload);
        localStorage.setItem("initialTodoListState", JSON.stringify(state));
      },
      prepare(data) {
        return {
          payload: {
            data,
          },
        };
      },
    },
    removeSubtask: {
      reducer(state, action) {
        state[action.payload.subtask.sectionId].todos[
          action.payload.subtask.todoId
        ].subtasks.splice(action.payload.index, 1);
        localStorage.setItem("initialTodoListState", JSON.stringify(state));
      },
      prepare(data) {
        return {
          payload: {
            data,
          },
        };
      },
    },
    toggleSubtaskIscompleted: {
      reducer(state, action) {
        state[action.payload.sectionId].todos[action.payload.todoId].subtasks[
          action.payload.id
        ].isCompleted =
          !state[action.payload.sectionId].todos[action.payload.todoId]
            .subtasks[action.payload.id].isCompleted;
        localStorage.setItem("initialTodoListState", JSON.stringify(state));
      },
      prepare(data) {
        return {
          payload: {
            data,
          },
        };
      },
    },
    addNote: {
      reducer(state, action) {
        state[action.payload._id.sectionId].todos[action.payload._id.id].note =
          action.payload.note;
        localStorage.setItem("initialTodoListState", JSON.stringify(state));
      },
      prepare(data) {
        return {
          payload: {
            data,
          },
        };
      },
    },
  },
});

export const selectAll = (state: RootState) => state.todoListSection;
export const {
  addTodoList,
  addNewTodo,
  deleteTodo,
  toggleIscompleted,
  toggleIsImportant,
  addNewSubtask,
  toggleSubtaskIscompleted,
  removeSubtask,
  addNote,
  changeDueDate,
} = todoListSlice.actions;
export default todoListSlice.reducer;
