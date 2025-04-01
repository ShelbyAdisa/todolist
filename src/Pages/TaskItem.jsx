import React, { useState, useContext } from 'react';
import { TodoContext } from '../Context/TodoContext';

const TaskItem = ({ task }) => {
  const { toggleComplete, deleteTask, editTask } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleEdit = () => {
    if (editedTitle.trim()) {
      editTask(task.id, editedTitle);
      setIsEditing(false);
    }
  };

  return (
    <div className={`border rounded-lg mb-3 p-4 transition-all ${task.completed ? 'bg-pink-100 border-pink-200' : 'bg-white border-pink-300'}`}>
      <div className="flex items-center justify-between">
        {isEditing ? (
          <div className="flex-grow flex">
            <input
              type="text"
              className="flex-grow p-2 border border-pink-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              autoFocus
            />
            <button
              onClick={handleEdit}
              className="bg-green-500 text-white px-4 py-2 rounded-r-lg hover:bg-green-600"
            >
              Save
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center flex-grow">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
                className="w-5 h-5 mr-3 text-pink-600 border-pink-300 rounded focus:ring-pink-500"
              />
              <span className={`flex-grow ${task.completed ? 'line-through text-pink-500' : 'text-pink-800'}`}>
                {task.title}
              </span>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-purple-600 hover:text-purple-800 p-1 rounded hover:bg-purple-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
