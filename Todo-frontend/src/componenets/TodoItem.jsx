import React, { useState } from 'react';
import axios from 'axios';

const TodoItem = ({ todo, setTodos }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const toggleComplete = async () => {
    const updatedTodo = await axios.put(`http://localhost:5000/api/todos/${todo._id}`, {
      completed: !todo.completed,
    });
    setTodos((todos) => todos.map((t) => (t._id === todo._id ? updatedTodo.data : t)));
  };

  const deleteTodo = async () => {
    await axios.delete(`http://localhost:5000/api/todos/${todo._id}`);
    setTodos((todos) => todos.filter((t) => t._id !== todo._id));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const updatedTodo = await axios.put(`http://localhost:5000/api/todos/${todo._id}`, {
      title: newTitle,
    });
    setTodos((todos) => todos.map((t) => (t._id === todo._id ? updatedTodo.data : t)));
    setIsEditing(false);
  };

  return (
    <li className={`p-2 mb-2 rounded border w-full sm:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto ${todo.completed ? 'bg-green-100' : 'bg-white'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={toggleComplete}
            className="mr-2"
          />
          {isEditing ? (
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="border p-1 rounded w-full"
            />
          ) : (
            <span
              className={`cursor-pointer ${todo.completed ? 'line-through' : ''}`}
              onClick={toggleComplete}
            >
              {todo.title}
            </span>
          )}
        </div>
        <div className="flex">
          {isEditing ? (
            <button onClick={handleSave} className="text-blue-500 mr-2">Save</button>
          ) : (
            <button onClick={handleEdit} className="text-blue-500 mr-2">Edit</button>
          )}
          <button onClick={deleteTodo} className="text-red-500">Delete</button>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
