import axios from "axios";
const apiUrl = "http://localhost:8000/api/admin/users";

export const getUsers = async (
  page = 1,
  search = "",
  role = "",
  status = "",
) => {
  const response = await axios.get(apiUrl, {
    params: {
      page,
      search,
      role,
      status,
    },
    headers: {
      "Cache-Control": "no-cache",
    },
  });

  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(`${apiUrl}/${id}`);

  return response.data;
};

export const toggleUserStatus = async (id) => {
  const response = await axios.patch(`${apiUrl}/${id}/block`);

  return response.data;
};

