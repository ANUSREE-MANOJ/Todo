import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from '../componenets/TodoList';

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get('http://localhost:5000/api/todos');
      setTodos(response.data);
    };
    fetchTodos();
  }, []);

  const addTodo = async () => {
    const response = await axios.post('http://localhost:5000/api/todos', { title });
    setTodos([...todos, response.data]);
    setTitle('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-5 text-center mt-20">Todo List</h1>
      <div className="mb-5 flex flex-col sm:flex-row justify-center items-center w-full max-w-xl">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new todo"
          className="p-2 rounded border w-full sm:w-2/3 mb-2 sm:mb-0 sm:mr-2"
        />
        <button onClick={addTodo} className="bg-blue-500 text-white rounded w-full sm:w-auto px-4 py-2">
          Add Todo
        </button>
      </div>
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default TodoPage;
