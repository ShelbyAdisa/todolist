import React, { createContext, useState, useEffect } from 'react';

export const TodoContext = createContext();

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  
 
  const filteredTasks = tasks.filter(task => {
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'active' && !task.completed) || 
      (filter === 'completed' && task.completed);
    
    const matchesSearch = 
      task.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });
  
  
  const addTask = (title) => {
    const newTask = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks([newTask, ...tasks]);
  };
  
  
  const toggleComplete = (id) => {
    setTasks(
      tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  
  
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  
  
  const editTask = (id, title) => {
    setTasks(
      tasks.map(task => 
        task.id === id ? { ...task, title } : task
      )
    );
  };
  
  
  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };
  
  return (
    <TodoContext.Provider
      value={{
        tasks,
        filteredTasks,
        filter,
        searchTerm,
        setSearchTerm,
        addTask,
        toggleComplete,
        deleteTask,
        editTask,
        changeFilter
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TaskProvider;