import axios from "axios";
const apiUrl = `${import.meta.env.VITE_API_URL}/api/admin/dashboard`;
export const getDashboardData = async () => {
  const response = await axios.get(apiUrl);

  return response.data;
};
