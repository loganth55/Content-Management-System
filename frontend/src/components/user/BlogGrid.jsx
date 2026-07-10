import { useNavigate } from "react-router-dom";

function BlogGrid({ posts }) {
const IMAGE_BASE_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <h2 className="text-3xl font-bold mb-10">Latest Posts</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.slice(0, 6).map((item) => (
          <div
            key={item._id}
            className="bg-white border rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-2 transition duration-300 cursor-pointer"
            onClick={() => navigate(`/blog/${item._id}`)}
          >
            {item.img ? (
              <img
                src={`${IMAGE_BASE_URL}${item.img}`}
                alt={item.title}
                className="w-full h-56 object-cover"
              />
            ) : (
              <div className="h-56 bg-gray-200 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}

            <div className="p-5">
              <p className="text-purple-600 text-sm font-medium mb-2">
                {item.category}
              </p>

              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>

              <p className="text-slate-600 mb-5 line-clamp-3">
                {item.description}
              </p>

              <div className="flex justify-between text-sm text-gray-500">
                <span>{item.author}</span>
                <span>
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BlogGrid;
