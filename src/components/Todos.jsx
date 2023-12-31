import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, updateTodo } from "../features/todo/todoSlice";
import Notification from "./Notification";
import { showNotification } from "../features/notification/notificationSlice";

function Todos() {
  const todos = useSelector((state) => state.Todo.Todos);
  const dispatch = useDispatch();
  const [editingTodo, setEditingTodo] = useState(null);
  const [updatedText, setUpdatedText] = useState("");
  const inputRef = useRef(null);


  const handleUpdateTodo = (id, newText, completed) => {
    if (newText.trim() === "") {
      dispatch(showNotification({notificationMessage:"Todo text cannot be empty!", notificationType: "warning"}));
      if(inputRef.current) 
        inputRef.current.focus();
      return;
    }
    dispatch(updateTodo({ id, text: newText.trim(), completed }));
    setEditingTodo(null);
    setUpdatedText("");

    dispatch(showNotification({notificationMessage:"Todo updated successfully!", notificationType :"success"}));
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
    setUpdatedText("");
  };

  const handleToggleComplete = (id, completed) => {
    if (!editingTodo) {
      const newCompletedState = !completed;
  
      dispatch(updateTodo({
        id,
        completed: newCompletedState,
        text: todos.find((todo) => todo.id === id).text
      }));
  
      const actionVerb = newCompletedState ? 'completed' : 'incompleted';
      const notificationMessage = `Todo marked ${actionVerb} successfully`;
  
      dispatch(showNotification({ notificationMessage, notificationType: 'success' }));
    }
  };

  const handleEditClick = (todo) => {
    setEditingTodo(todo.id);
    setUpdatedText(todo.text);
  };
  
  const handleDeleteClick = (id) =>{
    dispatch(removeTodo(id));
    dispatch(showNotification({notificationMessage:"Todo deleted successfully!", notificationType :"success"}));
  }

  useEffect(() => {
    // Focus on the input field after rendering
    if (editingTodo && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingTodo]);

  if (todos.length === 0) {
    return (
      <>
        <div className="mt-4 mb-4 text-md text-white font-medium">
          No Todos available
        </div>
      </>
    );
  }

  return (
    <>
    <Notification/>
      <div className="mt-4 mb-4 text-md text-white font-medium">Todos List</div>
      <ul className="list-none">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`mt-4 p-2.5 rounded-lg ${
              editingTodo === todo.id ? " bg-gray-600" : " bg-gray-900"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center w-full">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo.id, todo.completed)}
                  className="mr-2 accent-indigo-600"
                  disabled={editingTodo === todo.id}
                />
                {editingTodo === todo.id ? (
                  <>
                    <input
                      type="text"
                      value={updatedText}
                      onChange={(e) => setUpdatedText(e.target.value)}
                      className="text-white bg-transparent border-none focus:outline-none w-full"
                      ref={inputRef}
                    />
                  </>
                ) : (
                  <>
                    <div
                      className={`text-white ${
                        todo.completed ? "line-through" : ""
                      }`}
                    >
                      {todo.text}
                    </div>
                  </>
                )}
              </div>
              {editingTodo === todo.id && (
                <div className="flex items-center">
                  <button
                    onClick={() =>
                      handleUpdateTodo(todo.id, updatedText, todo.completed)
                    }
                    className="text-white border-0 py-1 px-2 focus:outline-none hover:bg-indigo-600 rounded text-md"
                    title="Save"
                  >
                    📁
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="text-white border-0 py-1 px-2 focus:outline-none hover:bg-indigo-600 rounded text-md"
                    title="Cancel"
                  >
                    ❌
                  </button>
                </div>
              )}
              {editingTodo !== todo.id && (
                <div className="flex items-center">
                  <button
                    onClick={() => handleEditClick(todo)}
                    className={`text-white border-0 py-1 px-2 focus:outline-none rounded text-md ${
                      todo.completed ? "cursor-not-allowed" : "hover:bg-indigo-600"
                    }`}
                    title="Edit"
                    disabled={todo.completed}
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDeleteClick(todo.id)}
                    className="text-white border-0 py-1 px-2 focus:outline-none hover:bg-indigo-600 rounded text-md"
                    title="Delete"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todos;
