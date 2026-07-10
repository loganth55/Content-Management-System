import axios from "axios";
const apiUrl = "http://localhost:8000/api/admin/dashboard";
export const getDashboardData = async () => {
  const response = await axios.get(apiUrl);

  return response.data;
};
