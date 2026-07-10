import axios from "axios";

const apiUrl = "http://localhost:8000/api/admin/blogs";

const token = () => ({
  headers: {
    Authorization: localStorage.getItem("token"),
  },
});

export const getBlogs = async (page, search, status, category) => {
  const response = await axios.get(
    `${apiUrl}?page=${page}&search=${search}&status=${status}&category=${category}`,
    token(),
  );

  return response.data;
};

export const deleteBlog = async (id) => {
  const response = await axios.delete(`${apiUrl}/${id}`, token());

  return response.data;
};

export const toggleBlogStatus = async (id) => {
  const response = await axios.patch(`${apiUrl}/${id}/status`, {}, token());

  return response.data;
};
