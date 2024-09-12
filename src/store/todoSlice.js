import { createSlice } from "@reduxjs/toolkit";

const initialTodoListState = [
  {
    name: "My Day",
    todos: [
      {
        id: 0,
        sectionId: "0",
        title: "title",
        isCompleted: false,
        isImportant: false,
        due: "",
        subtasks: [
          {
            subtaskTitle: "subtask1",
            isCompleted: false,
            isImportant: false,
          },
        ],
      },
    ],
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
      },
    },
    deleteTodo: {
      reducer(state, action) {
        state[action.payload._id.sectionId].todos.splice(
          action.payload.index,
          1
        );
      },
    },
    toggleIscompleted: {
      reducer(state, action) {
        state[action.payload.sectionId].todos[action.payload.id].isCompleted =
          !state[action.payload.sectionId].todos[action.payload.id].isCompleted;
      },
    },
    addNewSubtask: {
      reducer(state, action) {
        state[action.payload.sectionId].todos[
          action.payload.todoId
        ].subtasks.push(action.payload);
      },
    },
  },
});

export const selectAll = (state) => state.todoListSection;
export const {
  addTodoList,
  addNewTodo,
  toggleIscompleted,
  addNewSubtask,
  deleteTodo,
} = todoListSlice.actions;
export default todoListSlice.reducer;
