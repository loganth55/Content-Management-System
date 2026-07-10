import axios from "axios";

const apiUrl = "http://localhost:8000/api/subscribe";

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
