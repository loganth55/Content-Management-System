import axios from "axios";

const apiUrl = "http://localhost:8000/api/home";

export const getHomeStats = async () => {
  const response = await axios.get(`${apiUrl}/stats`);
  return response.data;
};
