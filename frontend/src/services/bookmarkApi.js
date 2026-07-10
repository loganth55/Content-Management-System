import axios from "axios";

const apiUrl = `${import.meta.env.VITE_API_URL}/bookmark`;

export const saveBookmark = async (blogId) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${apiUrl}/${blogId}`,
    {},
    {
      headers: {
        Authorization: token,
      },
    },
  );

  return response.data;
};

export const getBookmarks = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(apiUrl, {
    headers: {
      Authorization: token,
    },
  });

  return response.data;
};

export const removeBookmark = async (blogId) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(`${apiUrl}/${blogId}`, {
    headers: {
      Authorization: token,
    },
  });

  return response.data;
};
