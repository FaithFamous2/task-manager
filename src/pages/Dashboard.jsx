import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import TaskForm from '../components/Tasks/TaskForm';
import TaskList from '../components/Tasks/TaskList';
import Header from '../components/Layout/Header';
import useAuth from '../hooks/useAuth';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [editingTask, setEditingTask] = useState(null);
  const { user } = useAuth();
  const taskListRef = useRef();

  useEffect(() => {
    const handleAuthRedirect = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (!data.session) {
        // Check URL for access token (email confirmation)
        const queryParams = new URLSearchParams(location.search);
        const accessToken = queryParams.get('access_token');

        if (accessToken) {
          try {
            // Exchange access token for session
            const { error: tokenError } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: queryParams.get('refresh_token'),
            });

            if (tokenError) throw tokenError;

            // Remove token from URL
            navigate('/dashboard', { replace: true });
          } catch (err) {
            console.error('Session setup error:', err);
            navigate('/login');
          }
        } else {
          navigate('/login');
        }
      }
    };

    handleAuthRedirect();
  }, [location, navigate]);


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
