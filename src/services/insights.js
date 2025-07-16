import { supabase } from './supabase';
import { fetchTasks } from './tasks';

export const getInsights = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      throw new Error('No session found');
    }

    const response = await fetch(`${import.meta.env.VITE_EDGE_FUNCTION_URL}`, {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch insights: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.warn('Edge function failed, falling back to local calculation:', error);
    // Fallback to local calculation if edge function fails
    return await getLocalInsights();
  }
};

// Fallback function to calculate insights locally
const getLocalInsights = async () => {
  const { data: tasks, error } = await fetchTasks();
  
  if (error) {
    throw new Error('Failed to fetch tasks for insights');
  }

  const total = tasks?.length || 0;
  const pending = tasks?.filter(task => task.status === 'pending').length || 0;
  const inProgress = tasks?.filter(task => task.status === 'in-progress').length || 0;
  const done = tasks?.filter(task => task.status === 'done').length || 0;
  const completionRate = total > 0 ? Math.round((done / total) * 100) : 0;

  return {
    total,
    pending,
    inProgress,
    done,
    completionRate
  };
};
