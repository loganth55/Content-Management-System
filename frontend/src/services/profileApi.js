import axios from "axios";

const apiUrl = "http://localhost:8000/api/profile";

export const getProfile = async (id) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${apiUrl}/${id}`, {
    headers: {
      Authorization: token,
    },
  });

  return response.data;
};
