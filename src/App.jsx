import React from 'react';
import TaskProvider from './Context/TodoContext.jsx';
import Dashboard from './Pages2/Dashboard.jsx';

function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-50 py-8">
        <Dashboard />
      </div>
    </TaskProvider>
  );
}

export default App;
