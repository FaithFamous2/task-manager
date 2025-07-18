import { supabase } from './supabase';

// export const signUp = async (email, password) => {
//   const { data, error } = await supabase.auth.signUp({
//     email,
//     password,
//   });
//   return { data, error };
// };
export const signUp = async (email, password) => {
  const isProduction = import.meta.env.PROD;
  const baseUrl = isProduction
    ? "https://task-manager-ten-orcin.vercel.app"
    : window.location.origin;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${baseUrl}/dashboard`,
    },
  });
  return { data, error };
};

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = () => {
  return supabase.auth.getUser();
};

// export const signUpWithRedirect = async (email, password) => {
//   const { error } = await supabase.auth.signUp({
//     email,
//     password,
//     options: {
//       emailRedirectTo: `${window.location.origin}/dashboard`,
//     },
//   });
//   return { error };
// };

export const signUpWithRedirect = async (email, password) => {
  const isProduction = import.meta.env.PROD;
  const baseUrl = isProduction
    ? "https://task-manager-ten-orcin.vercel.app"
    : window.location.origin;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${baseUrl}/dashboard`,
    },
  });
  return { data, error };
};
