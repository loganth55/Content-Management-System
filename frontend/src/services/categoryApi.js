import API from "./api";

const apiUrl = "/api/admin/categories";

export const getAllCategory = async (params) => {
  const response = await API.get(apiUrl, {
    params,
  });

  return response.data;
};

export const createCategory = async (formData) => {
  const response = await API.post(apiUrl, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const editCategory = async (id, updateFormData) => {
  const response = await API.put(`${apiUrl}/${id}`, updateFormData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await API.delete(`${apiUrl}/${id}`);

  return response.data;
};
