import { supabase } from './supabase';

export const fetchTasks = async (statusFilter = null) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { data: [], error: new Error('User not authenticated') };
  }

  let query = supabase
    .from('tasks')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (statusFilter) {
    query = query.eq('status', statusFilter);
  }

  const { data, error } = await query;
  return { data, error };
};

export const createTask = async (task) => {
  const { data, error } = await supabase.from('tasks').insert([task]);
  return { data, error };
};

export const updateTask = async (id, updates) => {
  const { data, error } = await supabase.from('tasks').update(updates).eq('id', id);
  return { data, error };
};

export const deleteTask = async (id) => {
  const { error } = await supabase.from('tasks').delete().eq('id', id);
  return { error };
};
