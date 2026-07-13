import React from "react";
import { useState, useEffect } from "react";
import ImageUploader from "./ImageUploader";
import { createposts } from "../../services/blogApi";
import { useNavigate } from "react-router-dom";
import { getUserCategories } from "../../services/userCategoryApi";
function CreatePostForm() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [content, setContent] = React.useState("");
  const [img, setImg] = React.useState(null);
  const [status, setStatus] = useState("Draft");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
const publishBlog = async () => {
  try {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("content", content);
      formData.append("img", img);
      formData.append("author", user.name);
      formData.append("status", status);

      const data = await createposts(formData);
      console.log({
        title,
        description,
        category,
        content,
        img,
      });
      console.log(data);

      setTitle("");
      setDescription("");
      setCategory("");
      setImg(null);
      setContent("");
    } else {
      navigate("/login");
    }
  } catch (err) {
    console.log(err.response?.status);
    console.log(err.response?.data?.message);

    alert(
      err.response?.data?.message || "Something went wrong. Please try again.",
    );
  }
};

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
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            value={title}
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
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            value={description}
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Category
          </label>

          <select
            className="w-full px-5 py-4 border border-slate-300 rounded-xl outline-none focus:border-slate-900 transition"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>

            {categories.map((item) => (
              <option key={item._id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Status
            </label>

            <select
              className="w-full px-5 py-4 border border-slate-300 rounded-xl outline-none focus:border-slate-900"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>
          </div>
        </div>
      </div>
      <ImageUploader
        img={img}
        setImg={setImg}
        content={content}
        setContent={setContent}
        publishBlog={publishBlog}
      />
    </section>
  );
}

export default CreatePostForm;
