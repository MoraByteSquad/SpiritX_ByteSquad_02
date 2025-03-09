import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import DOMPurify from 'dompurify';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth'; // Import API function
import React from 'react';
import SignupImage from '../assets/signup.jpg'; 

// Schema for validation
const schema = z.object({
  username: z.string().min(8, 'Username must be at least 8 characters long'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export default function Login() {
  const [error, setError] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    const sanitizedData = {
      username: DOMPurify.sanitize(data.username),
      password: DOMPurify.sanitize(data.password),
    };

    setSubmissionStatus('loading');
    setError(null);

    try {
      const response = await loginUser(sanitizedData);
      if (response.success) {
        setSubmissionStatus('success');
        sessionStorage.setItem('token', response.token);
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        throw new Error('Login failed');
      }
    } catch (err) {
      setSubmissionStatus('failed');
      setError(err.message);
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

        <form className="mt-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-white">
              Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              {...register('username')}
              className="mt-1 block w-full rounded-md border bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:border-indigo-400 focus:ring-indigo-400"
            />
            {errors.username && <p className="text-red-500">{errors.username.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              {...register('password')}
              className="mt-1 block w-full rounded-md border bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:border-indigo-400 focus:ring-indigo-400"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm focus:ring-2 focus:ring-offset-2 cursor-pointer ${
              submissionStatus === 'success'
                ? 'bg-green-600 hover:bg-green-500 focus:ring-green-500'
                : submissionStatus === 'failed'
                ? 'bg-red-600 hover:bg-red-500 focus:ring-red-500'
                : 'bg-indigo-600 hover:bg-indigo-500 focus:ring-indigo-500'
            }`}
            disabled={!isValid || submissionStatus === 'loading'}
          >
            {submissionStatus === 'loading'
              ? 'Submitting...'
              : submissionStatus === 'success'
              ? 'Login Successful!'
              : submissionStatus === 'failed'
              ? 'Login Failed!'
              : 'Login'}
          </button>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
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
