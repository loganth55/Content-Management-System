import { useNavigate } from "react-router-dom";

function FeaturedPost({ post }) {
  const navigate = useNavigate();

  const IMAGE_BASE_URL = import.meta.env.VITE_API_URL;

  if (!post) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div
        onClick={() => navigate(`/blog/${post._id}`)}
        className="overflow-hidden rounded-3xl border border-gray-200 bg-white cursor-pointer hover:shadow-xl transition"
      >
        <img
          src={`${IMAGE_BASE_URL}${post.img}`}
          alt={post.title}
          className="w-full h-64 md:h-96 object-cover"
        />

        <div className="p-6 md:p-8 flex flex-col h-full">
          <p className="text-sm font-medium text-purple-600 mb-3">
            {post.category} • {new Date(post.createdAt).toLocaleDateString()}
          </p>

          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h2>
          <p className="text-gray-600 flex-1 line-clamp-4">
            {post.description}
          </p>

          <div className="mt-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              {post.author.charAt(0).toUpperCase()}
            </div>

            <div>
              <p className="font-semibold text-gray-900">{post.author}</p>

              <p className="text-sm text-gray-500">Author</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedPost;
