// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { login, signup } from '../../../services/auth';

const LoginPage = ({setLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await signup(email, password);
        setLogin(false);
      } else {
        await login(email, password);
        setLogin(false);
      }
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="py-5 my-auto h-[80vh] flex items-center justify-center dark:bg-bgPrimaryDark">
      <div className="bg-white dark:bg-cardDark dark:text-text p-8 rounded shadow-md w-[90%] lg:w-[40%]">
        <h2 className="text-2xl font-bold mb-6">{isSignup ? 'Sign Up' : 'Login'}</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 ">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:border-icons  focus:outline-none dark:bg-bgInputsDark"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 ">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:border-icons  focus:outline-none dark:bg-bgInputsDark"
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-500 dark:bg-blue-700 hover:bg-teal-800 transition-all duration-300 dark:text-text text-white rounded">
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-blue-500 dark:text-blue-600 hover:-translate-y-[5px] transition-all duration-300 underline"
          >
            {isSignup ? 'Login' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
