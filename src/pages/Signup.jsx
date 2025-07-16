import React from 'react';
import SignupForm from '../components/Auth/SignupForm';
import Header from '../components/Layout/Header';

const Signup = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-md mx-auto py-12 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="mt-2 text-gray-600">Sign up to get started with task management</p>
        </div>

        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
