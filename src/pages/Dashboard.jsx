import React, { useState, useRef } from 'react';
import TaskForm from '../components/Tasks/TaskForm';
import TaskList from '../components/Tasks/TaskList';
import Header from '../components/Layout/Header';
import useAuth from '../hooks/useAuth';

const Dashboard = () => {
  const [editingTask, setEditingTask] = useState(null);
  const { user } = useAuth();
  const taskListRef = useRef();

  const handleTaskCreated = () => {
    // Refresh the task list when a new task is created
    if (taskListRef.current) {
      taskListRef.current.refreshTasks();
    }
    setEditingTask(null);
  };

  const handleEditComplete = () => {
    // Refresh the task list when a task is updated
    if (taskListRef.current) {
      taskListRef.current.refreshTasks();
    }
    setEditingTask(null);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                {editingTask ? 'Edit Task' : 'Create New Task'}
              </h2>
              <TaskForm
                userId={user?.id}
                onTaskCreated={handleTaskCreated}
                editingTask={editingTask}
                onEditComplete={handleEditComplete}
              />
            </div>
          </div>

          <div className="lg:w-2/3">
            <TaskList ref={taskListRef} onEdit={handleEdit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
