import { useEffect, useState } from "react";
import { getBookmarks } from "../../services/bookmarkApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { removeBookmark } from "../../services/bookmarkApi";
function Bookmarks() {
  const IMAGE_BASE_URL = import.meta.env.VITE_API_URL;

  const [bookmarks, setBookmarks] = useState([]);

  const navigate = useNavigate();

const fetchBookmarks = async () => {
  try {
    const data = await getBookmarks();
    setBookmarks(data);
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  fetchBookmarks();
}, []);

const handleRemoveBookmark = async (blogId) => {
  try {
    const data = await removeBookmark(blogId);

    toast.success(data.message);

    fetchBookmarks();
  } catch (err) {
    console.log(err);

    toast.error(err.response?.data?.message || "Something went wrong");
  }
};

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-bold mb-3">My Bookmarks</h1>

        <p className="text-slate-500 mb-12">
          All your saved blogs in one place.
        </p>

        {bookmarks.length === 0 ? (
          <div className="text-center py-20 border rounded-3xl">
            <h2 className="text-2xl font-bold">No Bookmarks Yet</h2>

            <p className="text-slate-500 mt-3">Save blogs to read later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookmarks
              .filter((item) => item.blogId)
              .map((item) => (
                <div
                  key={item._id}
                  onClick={() => navigate(`/blog/${item.blogId._id}`)}
                  className="border rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-2 transition duration-300 cursor-pointer"
                >
                  <img
                    src={`${IMAGE_BASE_URL}${item.blogId.img}`}
                    alt={item.blogId.title}
                    className="w-full h-52 object-cover"
                  />

                  <div className="p-5">
                    <p className="text-blue-600 text-sm font-medium mb-2">
                      {item.blogId.category}
                    </p>

                    <h2 className="text-2xl font-bold mb-3">
                      {item.blogId.title}
                    </h2>

                    <p className="text-slate-600 line-clamp-3 mb-5">
                      {item.blogId.description}
                    </p>

                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => navigate(`/blog/${item.blogId._id}`)}
                        className="text-blue-600 font-semibold"
                      >
                        Read →
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveBookmark(item.blogId._id);
                        }}
                        className="text-red-500 font-semibold hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Bookmarks;