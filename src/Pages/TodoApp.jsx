import React, { createContext, useContext, useState, useEffect } from 'react';


const TodoContext = createContext();


const STATUS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed'
};


const TodoProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState(STATUS.ALL);
  const [searchTerm, setSearchTerm] = useState('');

  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  
  useEffect(() => {
    let result = tasks;
    
    
    if (filter === STATUS.ACTIVE) {
      result = result.filter(task => !task.completed);
    } else if (filter === STATUS.COMPLETED) {
      result = result.filter(task => task.completed);
    }
    
   
    if (searchTerm) {
      result = result.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredTasks(result);
  }, [tasks, filter, searchTerm]);

  
  const addTask = (title) => {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
      createdAt: new Date()
    };
    setTasks([...tasks, newTask]);
  };

  
  const editTask = (id, title) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, title } : task
    ));
  };

  
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  
  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  
  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  return (
    <TodoContext.Provider value={{
      tasks,
      filteredTasks,
      filter,
      searchTerm,
      setSearchTerm,
      setFilter,
      addTask,
      editTask,
      deleteTask,
      toggleComplete,
      clearCompleted,
      STATUS
    }}>
      {children}
    </TodoContext.Provider>
  );
};


const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};


const TodoApp = () => {
  return (
    <TodoProvider>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <Header />
          <AddTask />
          <TaskList />
          <Footer />
        </div>
      </div>
    </TodoProvider>
  );
};


const Header = () => {
  const { searchTerm, setSearchTerm } = useTodo();
  
  return (
    <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600">
      <h1 className="text-2xl font-bold text-white mb-4">Task Manager</h1>
      <div className="relative">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};


const AddTask = () => {
  const [title, setTitle] = useState('');
  const { addTask } = useTodo();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addTask(title.trim());
      setTitle('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="px-6 py-4 border-b">
      <div className="flex">
        <input
          type="text"
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-grow px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Add
        </button>
      </div>
    </form>
  );
};

const TaskItem = ({ task }) => {
  const { toggleComplete, deleteTask, editTask } = useTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  
  const handleEdit = () => {
    if (editedTitle.trim() !== '') {
      editTask(task.id, editedTitle);
      setIsEditing(false);
    }
  };
  
  return (
    <li className="border-b last:border-b-0">
      <div className="px-6 py-4 flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
          className="h-5 w-5 text-blue-500 rounded focus:ring-blue-400"
        />
        
        {isEditing ? (
          <div className="flex-grow ml-4 flex">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="flex-grow px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              onClick={handleEdit}
              className="ml-2 text-sm bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditedTitle(task.title);
              }}
              className="ml-2 text-sm bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <span 
              className={`flex-grow ml-4 ${
                task.completed ? 'line-through text-gray-400' : 'text-gray-800'
              }`}
            >
              {task.title}
            </span>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-500 hover:text-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </li>
  );
};


const TaskList = () => {
  const { filteredTasks } = useTodo();
  
  if (filteredTasks.length === 0) {
    return (
      <div className="px-6 py-8 text-center text-gray-500">
        No tasks found. Add a new task or change filters.
      </div>
    );
  }
  
  return (
    <ul>
      {filteredTasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
};


const Footer = () => {
  const { filteredTasks, tasks, filter, setFilter, clearCompleted, STATUS } = useTodo();
  const completedCount = tasks.filter(task => task.completed).length;
  
  return (
    <div className="px-6 py-4 bg-gray-50 flex flex-col sm:flex-row sm:justify-between items-center text-sm text-gray-600">
      <div className="mb-3 sm:mb-0">
        {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'} displayed
        {completedCount > 0 && (
          <span> • {completedCount} completed</span>
        )}
      </div>
      
      <div className="flex space-x-2 mb-3 sm:mb-0">
        <button
          onClick={() => setFilter(STATUS.ALL)}
          className={`px-2 py-1 rounded ${
            filter === STATUS.ALL
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter(STATUS.ACTIVE)}
          className={`px-2 py-1 rounded ${
            filter === STATUS.ACTIVE
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter(STATUS.COMPLETED)}
          className={`px-2 py-1 rounded ${
            filter === STATUS.COMPLETED
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Completed
        </button>
      </div>
      
      {completedCount > 0 && (
        <button
          onClick={clearCompleted}
          className="text-red-500 hover:text-red-700"
        >
          Clear completed
        </button>
      )}
    </div>
  );
};

export default TodoApp;