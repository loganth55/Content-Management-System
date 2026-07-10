import axios from "axios";

const apiUrl = `${import.meta.env.VITE_API_URL}/api/admin/public/categories`;

export const getUserCategories = async () => {
  const response = await axios.get(apiUrl);
  return response.data;
};
