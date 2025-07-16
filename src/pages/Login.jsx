import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import LoginForm from '../components/Auth/LoginForm';
import Header from '../components/Layout/Header';

const Login = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-md mx-auto py-12 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="mt-2 text-gray-600">Sign in to manage your tasks</p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
