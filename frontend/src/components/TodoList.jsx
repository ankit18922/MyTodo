
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/todos";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  const getTodos = async () => {
    const res = await axios.get(API_URL);
    setTodos(res.data);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const addTodo = async () => {
    if (!task.trim()) return;
    const res = await axios.post(API_URL, { task });
    setTodos([...todos, res.data]);
    setTask("");
  };

  const toggleComplete = async (id, completed) => {
    const res = await axios.put(`${API_URL}/${id}`, { completed: !completed });
    setTodos(todos.map((t) => (t._id === id ? res.data : t)));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTodos(todos.filter((t) => t._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-6 ml-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-6 text-indigo-700">
          📝 My Todo List
        </h2>

        {/* Input Section */}
        <div className="flex mb-6">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a new task..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={addTodo}
            className="ml-3 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition duration-200"
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        {todos.length === 0 ? (
          <p className="text-center text-gray-500">No todos yet. Add one!</p>
        ) : (
          <ul className="space-y-3">
            {todos.map((t) => (
              <li
                key={t._id}
                className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg px-4 py-2 shadow-sm transition duration-200"
              >
                <span
                  onClick={() => toggleComplete(t._id, t.completed)}
                  className={`flex-1 cursor-pointer select-none ${
                    t.completed
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {t.task}
                </span>
                <button
                  onClick={() => deleteTodo(t._id)}
                  className="ml-3 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-lg transition duration-200"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TodoList;
