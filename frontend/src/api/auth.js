// api/auth.js

import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1/auth';

export const checkUsername = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/check-username/${username}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/sign-up`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const loginUser = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/sign-in`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};
