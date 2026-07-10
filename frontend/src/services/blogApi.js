import axios from "axios";

import API from "./api";
const apiUrl = "http://localhost:8000/api/data";

export const getposts = async()=>{
 
    const response = await API.get(apiUrl);
    return response.data

}

export const createposts =  async(formData)=>{

 const token = localStorage.getItem("token");

 const response = await API.post(apiUrl, formData, {
   headers: {
     Authorization: token,
     "Content-Type": "multipart/form-data",
   },
 });
    return response.data
}

export const deletepost = async(id) =>{
    const response = await API.delete(`${apiUrl}/${id}`);
    return response.id
}

export const getsinglepost = async (id) => {
  const response = await API.get(`${apiUrl}/${id}`);
  return response.data;
};

export const getRelatedPosts = async (category, id) => {
  const response = await API.get(`${apiUrl}/related/${category}/${id}`);
  return response.data;
};



export const updatepost = async (id, updateFormData) => {
  const token = localStorage.getItem("token");

  const response = await API.put(`${apiUrl}/${id}`, updateFormData, {
    headers: {
      Authorization: token,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getMyBlogs = async()=>{
  const token = localStorage.getItem("token");

  const response = await API.get(`${apiUrl}/myblogs`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
}