import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../api/auth';
import SignupImage from '../assets/signup.jpg'; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const[error,setError]=useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ username, password });
      const { token, isAdmin } = response.data;
      sessionStorage.setItem('token', token);
      const role = isAdmin ? 'admin' : 'user';
      login(role);
      navigate('/players');
    } catch (error) {
      alert(error.message);
      setError(error.message);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Background Image */}
      <div className="absolute inset-0 ">
        <img
          src={SignupImage}  // Path relative to the public folder
          alt="Signup Background"
          className="w-full h-full object-cover brightness-75 opacity-75 blur-xs"
        />
      </div>
      {/* Login Form */}
      <div className="w-full max-w-md bg-white/10 p-8 backdrop-blur-lg shadow-lg rounded-lg sm:px-10 border border-white/30 z-10">
        <div className="text-center">
          <h2 className="mt-6 text-2xl font-bold text-white">Login</h2>
        </div>

        <form className="mt-6 space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-white">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="mt-1 block w-full rounded-md border bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:border-indigo-400 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="mt-1 block w-full rounded-md border bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:border-indigo-400 focus:ring-indigo-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm focus:ring-2 focus:ring-offset-2 cursor-pointer bg-indigo-600 hover:bg-indigo-500 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white">
          Don't have an account?
          <a href="/signup" className="text-blue-500 ml-1">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
