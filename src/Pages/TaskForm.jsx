import React, { useState, useContext } from 'react';
import { TodoContext } from '../Context/TodoContext';

const TaskForm = () => {
  const { addTask } = useContext(TodoContext);
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addTask(title);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex">
        <input
          type="text"
          placeholder="Add a new task..."
          className="flex-grow p-3 border border-pink-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          type="submit"
          className="bg-pink-500 text-white px-6 py-3 rounded-r-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
