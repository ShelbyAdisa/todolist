import React, { useContext } from 'react';
import { TodoContext } from '../Context/TodoContext';

const TaskFilter = () => {
  const { filter, changeFilter, searchTerm, setSearchTerm } = useContext(TodoContext);

  return (
    <div className="mb-6 bg-pink-100 p-4 rounded-lg border border-pink-300 shadow-sm">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search tasks..."
          className="w-full p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => changeFilter('all')}
          className={`px-4 py-2 rounded-md transition-colors ${
            filter === 'all'
              ? 'bg-pink-500 text-white'
              : 'bg-pink-200 text-pink-700 hover:bg-pink-300'
          }`}
        >
          All
        </button>
        <button
          onClick={() => changeFilter('active')}
          className={`px-4 py-2 rounded-md transition-colors ${
            filter === 'active'
              ? 'bg-purple-500 text-white'
              : 'bg-purple-200 text-purple-700 hover:bg-purple-300'
          }`}
        >
          Active
        </button>
        <button
          onClick={() => changeFilter('completed')}
          className={`px-4 py-2 rounded-md transition-colors ${
            filter === 'completed'
              ? 'bg-pink-700 text-white' 
              : 'bg-pink-300 text-pink-800 hover:bg-pink-400'
          }`}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default TaskFilter;