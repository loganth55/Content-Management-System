import React from "react";
import { getposts } from "../../services/blogApi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Blogs() {
  const [posts, setPosts] = React.useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
const IMAGE_BASE_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const data = await getposts();
        console.log(data);
        setPosts(data);
      } catch (err) {
        console.log("Error fetching posts:", err);
      }
    };
    getAllPosts();
  }, []);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.description.toLowerCase().includes(search.toLowerCase()) ||
      post.category.toLowerCase().includes(search.toLowerCase()),
  );

  const featuredPost = filteredPosts[0];
  console.log(filteredPosts);
console.log(import.meta.env.VITE_API_URL);
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <div className="text-center mb-14">
        <p className="text-blue-600 font-medium mb-4">All Articles</p>

        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6">
          Blogs & Insights
        </h1>

        <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
          Discover articles about web development, AI, software engineering and
          technology.
        </p>

        {/* Search */}
        <div className="max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search blogs..."
            className="w-full border border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Blog Count */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Latest Articles</h2>

        <span className="text-slate-500">
          {search ? filteredPosts.length : posts.length} Articles Available
        </span>
      </div>

      {/* Bento Layout */}
      {search === "" && (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Featured Card */}
          <div
            onClick={() => navigate(`/blog/${featuredPost?._id}`)}
            className="lg:col-span-2 bg-slate-900 rounded-3xl overflow-hidden hover:shadow-2xl transition duration-300 cursor-pointer"
          >
            <div className="w-full aspect-[16/9] overflow-hidden rounded-3xl">
              <img
                src={`${IMAGE_BASE_URL}${featuredPost?.img}`}
                alt={featuredPost?.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-8">
              <span className="text-blue-400 text-sm font-medium">
                Featured Article
              </span>

              <h2 className="text-4xl font-bold text-white mt-3 mb-4">
                {featuredPost?.title}
              </h2>

              <p className="text-slate-300 mb-6">{featuredPost?.description}</p>

              <button className="bg-white text-slate-900 px-5 py-3 rounded-xl font-semibold">
                Read Article →
              </button>
            </div>
          </div>

          {/* Side Card */}
          <div className="flex flex-col gap-6">
            {filteredPosts.slice(1, 5).map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/blog/${item._id}`)}
                className="
          flex gap-4
          cursor-pointer
          group
          p-2
          rounded-xl
          transition-all
          duration-300
          hover:bg-slate-50
          hover:translate-x-2
          "
              >
                <img
                  src={`${IMAGE_BASE_URL}${item.img}`}
                  alt={item.title}
                  className="w-40 h-24 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex flex-col justify-center">
                  <h3 className="font-semibold text-lg leading-6 text-slate-900 group-hover:text-blue-600 transition">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-500 mt-2 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Remaining Blogs */}
      {/* No Results UI */}

      {search && filteredPosts.length === 0 && (
        <>
          <div className="text-center py-10">
            <h2 className="text-4xl font-bold mb-4">No blogs found</h2>

            <p className="text-slate-500 mb-10">
              We couldn't find any articles matching "{search}"
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {posts.slice(0, 3).map((item) => (
              <div
                key={item._id}
                className="bg-white border rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-2 transition duration-300 cursor-pointer"
                onClick={() => navigate(`/blog/${item._id}`)}
              >
                <img
                  src={`${IMAGE_BASE_URL}${item.img}`}
                  alt={item.title}
                  className="w-full h-56 object-cover"
                />

                <div className="p-6">
                  <div className="flex items-center gap-3 text-sm text-slate-500 mb-3">
                    <span className="text-blue-600 font-medium">
                      {item.category}
                    </span>

                    <span>•</span>

                    <span>
                      {new Date(item.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>

                  <p className="text-slate-600 mb-5 line-clamp-3">
                    {item.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <p className="font-semibold">{item.author}</p>

                    <span className="text-blue-600 font-medium">Read →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Remaining Blogs */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {(search ? filteredPosts : filteredPosts.slice(2)).map((item) => (
          <div
            key={item._id}
            className="bg-white border rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-2 transition duration-300 cursor-pointer"
            onClick={() => navigate(`/blog/${item._id}`)}
          >
            <img
              src={`${IMAGE_BASE_URL}${item.img}`}
              alt={item.title}
              className="w-full h-56 object-cover"
            />

            <div className="p-6">
              <div className="flex items-center gap-3 text-sm text-slate-500 mb-3">
                <span className="text-blue-600 font-medium">
                  {item.category}
                </span>

                <span>•</span>

                <span>
                  {new Date(item.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              <h3 className="text-2xl font-bold mb-3">{item.title}</h3>

              <p className="text-slate-600 mb-5 line-clamp-3">
                {item.description}
              </p>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.author}</p>
                </div>

                <span className="text-blue-600 font-medium">Read →</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Blogs;
