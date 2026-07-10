import React from "react";
import { getUserCategories } from "../../services/UserCategoryApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Category() {
  const [getCategories, setCategories] = React.useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllCategories = async () => {
      try {
       const response = await getUserCategories();
       setCategories(response.data);
        console.log(data);
      } catch (err) {
        console.log("Error fetching posts:", err);
      }
    };
    getAllCategories();
  }, []);

  console.log(getCategories);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16">
        <div className="bg-slate-900 rounded-3xl p-10 md:p-16">
          <p className="text-blue-400 font-medium mb-4">Explore Topics</p>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Browse Categories
          </h1>

          <p className="text-slate-300 text-lg max-w-5xl line-clamp-3">
            Explore high-quality content designed to inspire, educate, and keep
            you informed. From beginner-friendly tutorials to in-depth guide and
            the latest trends, discover resources that help you grow your
            knowledge and stay ahead. Stay up to date with fresh content that
            helps you learn, build, and grow with confidence.
          </p>
        </div>
      </section>

      {/* Categories */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getCategories.map((category) => (
          <div
            key={category._id}
            onClick={() => navigate(`/category/${category.name}`)}
            className="border rounded-2xl overflow-hidden bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            <img
              src={`http://localhost:8000${category.img}`}
              alt={category.name}
              className="w-full h-36 object-cover"
            />

            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{category.name}</h3>

              <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                {category.description}
              </p>

              <span className="text-blue-600 font-semibold text-sm">
                Explore →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
