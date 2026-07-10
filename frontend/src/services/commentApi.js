import axios from "axios"

const apiUrl = `${import.meta.env.VITE_API_URL}/api/comment`;

export const getComment = async(id)=>{
    const response = await axios.get(`${apiUrl}/${id}`)
    return response.data
}

export const createComment = async(data)=>{
   const token = localStorage.getItem("token");

   const response = await axios.post(apiUrl, data, {
     headers: {
       Authorization: token,
     },
   });
   
    return response.data
}

export const deleteComment = async(id)=>{
    const response = await axios.delete(`${apiUrl}/${id}`)
    return response.data;
}