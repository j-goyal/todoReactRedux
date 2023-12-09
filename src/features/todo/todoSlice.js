import { createSlice, nanoid } from "@reduxjs/toolkit";

const storedTodos = JSON.parse(localStorage.getItem("todos"));

const initialState = {
  Todos: storedTodos && Array.isArray(storedTodos) && storedTodos.length > 0 ? storedTodos : [{ id: 1, text: "Always Be Happy", completed: false }],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = { id: nanoid(), text: action.payload, completed: false };
      state.Todos.push(todo);
      updateLocalStorage(state.Todos);
    },
    removeTodo: (state, action) => {
      state.Todos = state.Todos.filter((todo) => todo.id !== action.payload);
      updateLocalStorage(state.Todos);
    },
    updateTodo: (state, action) => {
      const { id, text, completed } = action.payload;
      state.Todos = state.Todos.map((todo) =>
        todo.id === id ? { ...todo, text, completed } : todo
      );
      updateLocalStorage(state.Todos);
    },
  },
});

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;

// Function to update localStorage with the current todos
const updateLocalStorage = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};
