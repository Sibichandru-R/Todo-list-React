import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice.ts";

export const store = configureStore({
  reducer: {
    todoListSection: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;