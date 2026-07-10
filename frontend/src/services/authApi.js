import axios from "axios";

const apiUrl = `${import.meta.env.VITE_API_URL}/api/auth`;

export const loginUser = async (userData) => {
  const response = await axios.post(`${apiUrl}/login`, userData);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await axios.post(`${apiUrl}/register`, userData);
  return response.data;
};

export const googleLogin = async (credential) => {
  const response = await axios.post(`${apiUrl}/google-login`, {
    credential,
  });

  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await axios.post(`${apiUrl}/forgot-password`, {
    email,
  });

  return response.data;
};

export const resetPassword = async (token, password) => {
  const response = await axios.post(`${apiUrl}/reset-password/${token}`, {
    password,
  });

  return response.data;
};