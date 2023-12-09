import { createSlice, nanoid } from "@reduxjs/toolkit";

const initalState = {
    Todos : [{id:1, text:"Always Be Happy", completed: false}]
}

export const todoSlice = createSlice({
    name : "todo",
    initialState:initalState,
    reducers:{
        addTodo: (state,action) => {
            const todo = {id:nanoid(), text: action.payload, completed:false};
            state.Todos.push(todo);

        },
        removeTodo: (state,action) => {
            state.Todos = state.Todos.filter(todo => todo.id !== action.payload)
        },
        updateTodo: (state, action) => {
            const { id, text, completed } = action.payload;
            state.Todos = state.Todos.map((todo) =>
              todo.id === id ? { ...todo, text, completed } : todo
            );
        }
    }
});

export const{addTodo, removeTodo, updateTodo} = todoSlice.actions;
export default todoSlice.reducer;