import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todo/todoSlice";
import notificationReducer from "../features/notification/notificationSlice";


export const store = configureStore({
    reducer: {
        Todo: todoReducer,
        Notification: notificationReducer,
      },
});