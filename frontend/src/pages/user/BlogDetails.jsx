import React from "react";
import { useState,useEffect } from "react";
import { getsinglepost } from "../../services/blogApi";
import { useParams } from "react-router-dom";
import { createComment } from "../../services/commentApi";
import { getComment } from "../../services/commentApi";
import { useNavigate } from "react-router-dom";
import { getRelatedPosts } from "../../services/blogApi";
import Bookmark from "../../components/user/Bookmark";
import{Link} from "react-router-dom"
function BlogDetails() {
const IMAGE_BASE_URL = import.meta.env.VITE_API_URL;
const [blog, setBlog] = React.useState(null);
const[comment,setComment] = React.useState("")
const[allComments,setAllComments] = React.useState([])
const [relatedPosts, setRelatedPosts] = React.useState([]);
  
const {id} = useParams()
  const navigate = useNavigate();

useEffect(()=>{
    const getSinglePost = async()=>{
        try {
          setBlog(null)
          const data = await getsinglepost(id);
          setBlog(data);
         console.log("Blog Data:", data);
         console.log("userId:", data.userId);
        } catch (err) {
          console.log("Error fetching posts:", err);
        }
    }
    getSinglePost();
},[id])
  const fetchComment = async () => {
    try {
      const data = await getComment(id);
      setAllComments(data);
    } catch (err) {
      console.log("Error fetching posts:", err);
    }
  };
  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        if (!blog) return;

        const data = await getRelatedPosts(blog.category, blog._id);

        setRelatedPosts(data);
      } catch (err) {
        console.log("Error fetching related posts:", err);
      }
    };

    fetchRelatedPosts();
  }, [blog]);

useEffect(() => {
  fetchComment();
}, [id]);
const publishComment = async () => {
  try {
    if (!comment.trim()) {
      alert("Please enter a comment");
      return;
    }

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

      if (!token || !user) {
        alert("Please login to comment");
        navigate("/login");
        return;
      }

    if (token && user) {
      await createComment({
        postId: id,
        comment: comment,
      });

      await fetchComment();

      setComment("");
    }
  } catch (err) {
    console.log("Error creating comment:", err);
  }
};




if (blog === null) {
  return <h1>Loading..</h1>;
}




  return (
    <div className="bg-white min-h-screen">
      {/* Article Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <span className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium mb-6">
          {blog?.category}
        </span>

        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight mb-6">
          {blog?.title}
        </h1>

        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          {/* Author */}
          <Link
            to={blog?.userId?._id ? `/profile/${blog.userId._id}` : "#"}
            className="flex items-center gap-4 group"
            onClick={(e) => {
              if (!blog?.userId?._id) {
                e.preventDefault();
              }
            }}
          >
            {/* Avatar */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold text-xl">
              {blog.author.charAt(0).toUpperCase()}
            </div>

            {/* Author Info */}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition">
                  {blog.author}
                </h3>

                {/* Verified Badge */}
                <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px]">
                  ✓
                </div>
              </div>

              <p className="text-slate-500 text-sm">
                Published {new Date(blog.createdAt).toDateString()}
              </p>
            </div>
          </Link>

          {/* Bookmark */}
          <Bookmark blogId={blog._id} />
        </div>

        <p className="text-xl text-slate-600 leading-relaxed mb-10">
          {blog?.description}
        </p>
      </section>

      {/* Cover Image */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full aspect-[16/9] overflow-hidden rounded-3xl">
          <img
            src={`${IMAGE_BASE_URL}${blog?.img}`}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Blog Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">{blog.content}</div>
      </section>

      {/* Discussion */}
      {/* Discussion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="border-t pt-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Discussion</h2>

          <p className="text-slate-500 mb-8">
            Join the discussion about this article.
          </p>

          {/* Comment Box */}
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 mb-10">
            <textarea
              rows="4"
              placeholder="Write your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border border-slate-300 rounded-2xl p-4 outline-none resize-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex justify-end mt-5">
              <button
                onClick={publishComment}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition duration-300"
              >
                Post Comment
              </button>
            </div>
          </div>

          {/* Total Comments */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-slate-800">
              Comments ({allComments.length})
            </h3>
          </div>

          {/* No Comments */}
          {allComments.length === 0 ? (
            <div className="border rounded-3xl p-12 text-center bg-slate-50">
              <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-5 text-2xl">
                💬
              </div>

              <h3 className="text-xl font-semibold text-slate-800">
                No comments yet
              </h3>

              <p className="text-slate-500 mt-2">
                Be the first person to comment on this article.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {allComments.map((item) => (
                <div
                  key={item._id}
                  className="border border-slate-200 rounded-3xl p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <Link
                      to={`/profile/${item.userId?._id}`}
                      className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg hover:scale-105 transition"
                    >
                      {item.userId?.name?.charAt(0).toUpperCase()}
                    </Link>

                    {/* Comment Content */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <div>
                          <Link
                            to={`/profile/${item.userId?._id}`}
                            className="font-semibold text-slate-900 text-lg hover:text-blue-600 transition"
                          >
                            {item.userId?.name}
                          </Link>

                          <p className="text-sm text-slate-500">
                            {item.userId?.email}
                          </p>
                        </div>

                        <span className="text-sm text-slate-400">
                          {new Date(item.createdAt).toLocaleString()}
                        </span>
                      </div>

                      <p className="mt-4 text-slate-700 leading-7">
                        {item.comment}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Related Posts */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <h2 className="text-3xl font-bold mb-10">Related Articles</h2>

        {relatedPosts.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-slate-500 text-lg">No related articles found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/blog/${item._id}`)}
                className="border rounded-3xl overflow-hidden hover:shadow-lg hover:-translate-y-2 transition duration-300 cursor-pointer"
              >
                <img
                  src={`${IMAGE_BASE_URL}${item.img}`}
                  alt={item.title}
                  className="w-full h-52 object-cover"
                />

                <div className="p-5">
                  <p className="text-blue-600 text-sm font-medium mb-2">
                    {item.category}
                  </p>

                  <h3 className="text-xl font-bold mb-3 line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 line-clamp-3 mb-4">
                    {item.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">
                      {item.author}
                    </span>

                    <span className="text-blue-600 font-medium">Read →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default BlogDetails;
