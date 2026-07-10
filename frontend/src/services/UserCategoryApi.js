import axios from "axios";

const apiUrl = "http://localhost:8000/api/admin/public/categories";

export const getUserCategories = async () => {
  const response = await axios.get(apiUrl);
  return response.data;
};
