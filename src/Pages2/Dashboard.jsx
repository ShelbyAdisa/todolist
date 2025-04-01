import React from 'react';
import Header from '../Pages/Header';
import TaskForm from '../Pages/TaskForm';
import TaskFilter from '../Pages/TaskFilter';
import TaskList from '../Pages/TaskList';

const Dashboard = () => {
  return (
    <div className="container mx-auto max-w-2xl px-4">
      <Header />
      <main>
        <TaskForm />
        <TaskFilter />
        <TaskList />
      </main>
    </div>
  );
};

export default Dashboard;