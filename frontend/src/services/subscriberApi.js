import axios from "axios";

const apiUrl = `${import.meta.env.VITE_API_URL}/api/subscribe`;

export const subscribe = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    apiUrl,
    {},
    {
      headers: {
        Authorization: token,
      },
    },
  );

  return response.data;
};
