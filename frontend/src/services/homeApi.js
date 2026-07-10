import axios from "axios";

const apiUrl = `${import.meta.env.VITE_API_URL}/api/home`;

export const getHomeStats = async () => {
  const response = await axios.get(`${apiUrl}/stats`);
  return response.data;
};
