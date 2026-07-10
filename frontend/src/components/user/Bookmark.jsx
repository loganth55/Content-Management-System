import { useNavigate } from "react-router-dom";
import { saveBookmark } from "../../services/bookmarkApi";
import toast from "react-hot-toast";
function Bookmark({ blogId }) {
  const navigate = useNavigate();

  const handleBookmark = async () => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (!token || !user) {
        toast.error("Please login first");
        navigate("/login");
        return;
      }

      const data = await saveBookmark(blogId);

      toast.success(data.message);
    } catch (err) {
      console.log(err);

      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  };

  return (
    <button
      onClick={handleBookmark}
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition duration-300"
    >
      🔖 Save
    </button>
  );
}

export default Bookmark;
