import { useParams } from "react-router-dom";
import { getposts } from "../../services/blogApi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function CategoryBlogs() {
  const [posts, setPosts] = useState([]);
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const IMAGE_BASE_URL = import.meta.env.VITE_API_URL;
  console.log(categoryName);
  useEffect(() => {
    const getAllCategoryBlog = async () => {
      try {
        const data = await getposts();
        console.log(data);
        const filteredPosts = data.filter(
          (post) => post.category === categoryName,
        );
        console.log(filteredPosts);
        setPosts(filteredPosts);
      } catch (err) {
        console.log("Error fetching posts:", err);
      }
    };
    getAllCategoryBlog();
  }, []);
  console.log(posts);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16">
        <div className="text-center">
          <p className="text-blue-600 font-medium mb-4">Category</p>

          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            {categoryName}
          </h1>

          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Discover articles, tutorials and insights related to {categoryName}.
          </p>
        </div>
      </section>

      {/* Articles Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold">Articles</h2>

          <span className="text-slate-500">{posts.length}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((item) => (
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
                <p className="text-blue-600 text-sm font-medium mb-2">
                  {categoryName}
                </p>

                <h3 className="text-xl font-bold mb-3">{item.title}</h3>

                <p className="text-slate-600 mb-5 line-clamp-3">
                  {item.description}
                </p>

                <div className="flex justify-between text-sm text-slate-500">
                  <span>{item.author}</span>
                  <span>
                    {new Date(item.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default CategoryBlogs;
