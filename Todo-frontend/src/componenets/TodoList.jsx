import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, setTodos }) => {
  return (
    <ul className="w-full flex flex-col items-center">
      {todos.map(todo => (
        <TodoItem key={todo._id} todo={todo} setTodos={setTodos} />
      ))}
    </ul>
  );
};

export default TodoList;
