import React, { useContext } from 'react';
import { TodoContext } from '../Context/TodoContext';
import TaskItem from './TaskItem';

const TaskList = () => {
  const { filteredTasks } = useContext(TodoContext);

  if (filteredTasks.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p>No tasks found</p>
      </div>
    );
  }

  return (
    <div>
      {filteredTasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;