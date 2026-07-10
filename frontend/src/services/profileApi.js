import axios from "axios";

const apiUrl = `${import.meta.env.VITE_API_URL}/api/profile`;

export const getProfile = async (id) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${apiUrl}/${id}`, {
    headers: {
      Authorization: token,
    },
  });

  return response.data;
};
