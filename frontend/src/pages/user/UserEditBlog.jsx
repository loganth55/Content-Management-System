import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageUploader from "../../components/user/ImageUploader";
import { getUserCategories } from "../../services/userCategoryApi";

import { getsinglepost, updatepost } from "../../services/blogApi";
function UserEditBlog() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [content, setContent] = useState("");
  const [img, setImg] = useState(null);
  const [oldImg, setOldImg] = useState("");
  const [categories, setCategories] = useState([]);

  const IMAGE_BASE_URL = import.meta.env.VITE_API_URL;
  const updateBlog = async () => {
    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("status", status);
      formData.append("content", content);

      if (img) {
        formData.append("img", img);
      }

      await updatepost(id, formData);

      setTitle("");
      setDescription("");
      setCategory("");
      setStatus("");
      setContent("");
      setImg(null);
      setOldImg("");

      navigate("/my-blogs");
    } catch (err) {
      console.log("Error updating blog:", err);
    }
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getsinglepost(id);

        console.log(data);

        setTitle(data.title);
        setDescription(data.description);
        setCategory(data.category);
        setStatus(data.status);
        setContent(data.content);
        setOldImg(data.img);
      } catch (err) {
        console.log("Error fetching blog:", err);
      }
    };

    fetchBlog();
  }, [id]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getUserCategories();
        setCategories(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategories();
  }, []);
  return (
    <section className="max-w-5xl mx-auto px-6 py-14">
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-8 md:p-10">
        {/* Blog Title */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Blog Title
          </label>

          <input
            type="text"
            placeholder="Enter your blog title..."
            className="w-full px-5 py-4 border border-slate-300 rounded-xl outline-none focus:border-slate-900 transition"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Short Description
          </label>

          <textarea
            rows={4}
            placeholder="Write a short description..."
            className="w-full px-5 py-4 border border-slate-300 rounded-xl resize-none outline-none focus:border-slate-900 transition"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Category */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-5 py-4 border border-slate-300 rounded-xl outline-none focus:border-slate-900 transition"
          >
            <option value="">Select Category</option>

            {categories.map((item) => (
              <option key={item._id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Status
          </label>

          <select
            className="w-full px-5 py-4 border border-slate-300 rounded-xl outline-none focus:border-slate-900 transition"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </div>
      </div>

      <ImageUploader
        img={img}
        setImg={setImg}
        oldImg={oldImg}
        content={content}
        setContent={setContent}
        publishBlog={updateBlog}
      />
    </section>
  );
}

export default UserEditBlog;