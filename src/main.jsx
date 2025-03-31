import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import TodoApp from './Pages/TodoApp.jsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <TodoApp />
    </BrowserRouter>
  </StrictMode>
);