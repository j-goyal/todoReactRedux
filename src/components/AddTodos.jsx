import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";
import Notification from "./Notification";
import { showNotification } from "../features/notification/notificationSlice";

function AddTodos() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const inputAddRef = useRef(null);

  const addTodoHandler = (e) => {
    e.preventDefault();

    if (input.trim() === "") {
      dispatch(showNotification({ notificationMessage: 'Please enter a todo!', notificationType: 'warning' }));
      inputAddRef.current.focus();
      return;
    }

    dispatch(addTodo(input));
    dispatch(showNotification({ notificationMessage: 'Todo Added Successfully!', notificationType: 'success' }));
    setInput("");
  };

  return (
    <>
      <Notification/>
      <form onSubmit={addTodoHandler} className="space-x-3 mt-12">
        <input
          type="text"
          className="bg-gray-800 w-1/3 rounded border border-gray-700 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          placeholder="Enter a Todo..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          ref={inputAddRef}
        />
        <button
          type="submit"
          className="text-white bg-gray-600 border-0 py-1.5 px-5 focus:outline-none hover:bg-indigo-600 rounded-xl text-md"
        >
          Add Todo
        </button>
      </form>
      </>
  );
}

export default AddTodos;
