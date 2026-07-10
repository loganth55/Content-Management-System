import API from "./api";

const apiUrl = `${import.meta.env.VITE_API_URL}/api/dashboard`;

export const getDashboardStats = async () => {
  const token = localStorage.getItem("token");
  const response = await API.get(`${apiUrl}/stats`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

export const getMonthlyBlogs = async (year) => {
  const token = localStorage.getItem("token");

  const response = await API.get(`${apiUrl}/monthly-blogs?year=${year}`, {
    headers: {
      Authorization: token,
    },
  });

  return response.data;
};

export const getTopCategories = async () => {
  const token = localStorage.getItem("token");
  const response = await API.get(`${apiUrl}/top-categories`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};
