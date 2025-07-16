import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import TaskItem from './TaskItem';
import { fetchTasks, deleteTask } from '../../services/tasks';

const TaskList = forwardRef(({ onEdit }, ref) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  const loadTasks = async () => {
    try {
      setLoading(true);
      const { data, error } = await fetchTasks(
        statusFilter !== 'all' ? statusFilter : null
      );

      if (error) throw error;
      setTasks(data || []);
    } catch (err) {
      setError(err.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [statusFilter]);

  // Expose refreshTasks method to parent component
  useImperativeHandle(ref, () => ({
    refreshTasks: loadTasks
  }));

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      const { error } = await deleteTask(id);
      if (error) throw error;
      
      // Remove the task from the local state
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete task');
    }
  };

  if (loading && tasks.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md text-red-700">
        <p>{error}</p>
        <button
          onClick={loadTasks}
          className="mt-2 text-indigo-600 hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-gray-800">Your Tasks</h2>

        <div className="flex space-x-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Completed</option>
          </select>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-700">No tasks found</h3>
          <p className="mt-1 text-gray-500">Create your first task to get started</p>
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
});

export default TaskList;
