import { createSlice } from "@reduxjs/toolkit";
const d = JSON.parse(localStorage.getItem("initialTodoListState"));
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
    },
    deleteTodo: {
      reducer(state, action) {
        state[action.payload._id.sectionId].todos.splice(
          action.payload.index,
          1
        );
        localStorage.setItem("initialTodoListState", JSON.stringify(state));
      },
    },
    toggleIscompleted: {
      reducer(state, action) {
        state[action.payload.sectionId].todos[action.payload.id].isCompleted =
          !state[action.payload.sectionId].todos[action.payload.id].isCompleted;
        localStorage.setItem("initialTodoListState", JSON.stringify(state));
      },
    },
    toggleIsImportant: {
      reducer(state, action) {
        state[action.payload.sectionId].todos[action.payload.id].isImportant =
          !state[action.payload.sectionId].todos[action.payload.id].isImportant;
        localStorage.setItem("initialTodoListState", JSON.stringify(state));
      },
    },
    changeDueDate: {
      reducer(state, action) {
        state[action.payload.sectioId].todos[action.payload.id].due =
          action.payload.due;
        // console.log(action.payload)
      },
    },
    addNewSubtask: {
      reducer(state, action) {
        state[action.payload.sectionId].todos[
          action.payload.todoId
        ].subtasks.push(action.payload);
        localStorage.setItem("initialTodoListState", JSON.stringify(state));
      },
    },
    removeSubtask: {
      reducer(state, action) {
        state[action.payload.subtask.sectionId].todos[
          action.payload.subtask.todoId
        ].subtasks.splice(action.payload.index, 1);
        localStorage.setItem("initialTodoListState", JSON.stringify(state));
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
    },
    addNote: {
      reducer(state, action) {
        state[action.payload._id.sectionId].todos[action.payload._id.id].note =
          action.payload.note;
        localStorage.setItem("initialTodoListState", JSON.stringify(state));
      },
    },
  },
});

export const selectAll = (state) => state.todoListSection;
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
