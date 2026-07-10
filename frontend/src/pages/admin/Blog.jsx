import { useEffect, useState } from "react";

import { getBlogs,deleteBlog,toggleBlogStatus } from "../../services/adminBlogApi";

import BlogCards from "../../components/admin/Blogs/BlogCards";
import BlogFilters from "../../components/admin/Blogs/BlogFilters";
import BlogTable from "../../components/admin/Blogs/BlogTable";
import WeeklyBlogGrowth from "../../components/admin/Blogs/WeeklyBlogGrowth";
import BlogStatusChart from "../../components/admin/Blogs/BlogStatusChart";
import Pagination from "../../components/admin/Blogs/Pagination";

function Blog() {
  const [cards, setCards] = useState({
    totalBlogs: 0,
    publishedBlogs: 0,
    draftBlogs: 0,
    weeklyPublishedBlogs: 0,

    totalBlogGrowth: 0,
    publishedBlogGrowth: 0,
    draftBlogGrowth: 0,
    weeklyPublishedBlogGrowth: 0,

    totalBlogTrend: [],
    publishedBlogTrend: [],
    draftBlogTrend: [],
    weeklyPublishedBlogTrend: [],
  });

  const [blogs, setBlogs] = useState([]);

  const [weeklyBlogsGrowth, setWeeklyBlogsGrowth] = useState([]);

  const [blogStatus, setBlogStatus] = useState([]);

 

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [category, setCategory] = useState("");

  const [author, setAuthor] = useState("");


  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchBlogs();
  }, [page, search, status, category]);

  const fetchBlogs = async () => {
    try {
     const response = await getBlogs(page, search, status, category);

     setCards(response.data.cards);

     setWeeklyBlogsGrowth(response.data.weeklyBlogsGrowth);

     setBlogStatus(response.data.blogStatus);

     setBlogs(response.data.blogs);

     setPagination(response.data.pagination);

     console.log(blogStatus)
     console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  console.log(blogStatus);

const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this blog?",
  );

  if (!confirmDelete) return;

  try {
    const response = await deleteBlog(id);

    alert(response.message);

    fetchBlogs();
  } catch (error) {
    console.log(error);

    alert("Failed to delete blog.");
  }
};

const handleToggleStatus = async (id) => {
  const confirmStatus = window.confirm(
    "Are you sure you want to change the blog status?",
  );

  if (!confirmStatus) return;

  try {
    const response = await toggleBlogStatus(id);

    alert(response.message);

    fetchBlogs();
  } catch (error) {
    console.log(error);

    alert("Failed to update blog status.");
  }
};

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Blogs Management</h1>

        <p className="text-gray-500 mt-1">Manage all blogs from one place.</p>
      </div>

      {/* Cards */}
      <BlogCards cards={cards} />

      {/* Main Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left */}
        <div className="xl:col-span-2 space-y-6">
          <BlogFilters
            search={search}
            setSearch={setSearch}
            status={status}
            setStatus={setStatus}
            category={category}
            setCategory={setCategory}
            author={author}
            setAuthor={setAuthor}
          />

          <BlogTable
            blogs={blogs}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
          />

          <Pagination pagination={pagination} page={page} setPage={setPage} />
        </div>

        {/* Right */}
        <div className="space-y-6">
          <WeeklyBlogGrowth data={weeklyBlogsGrowth} />

          <BlogStatusChart data={blogStatus} totalBlogs={cards.totalBlogs} />
        </div>
      </div>
    </div>
  );
}

export default Blog;
