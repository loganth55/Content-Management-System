import { Eye, Pencil, Trash2, CheckCircle, FileText } from "lucide-react";

function BlogTable({ blogs, onDelete, onToggleStatus }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b">
        <h2 className="text-2xl font-bold">Blog List</h2>

        <p className="text-gray-500 text-sm mt-1">
          Manage published and draft blogs
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr className="text-left text-sm text-gray-500">
            

              <th className="px-5 py-4">Blog</th>

              <th className="px-5 py-4">Author</th>

              <th className="px-5 py-4">Category</th>

              <th className="px-5 py-4">Status</th>

              <th className="px-5 py-4">Created On</th>

              <th className="px-5 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {blogs.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-16 text-center text-gray-500">
                  No blogs found.
                </td>
              </tr>
            ) : (
              blogs.map((blog) => (
                <tr
                  key={blog._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  {/* Checkbox */}
                  

                  {/* Blog */}
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-violet-100 flex items-center justify-center">
                        <FileText className="text-violet-600" size={22} />
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {blog.title}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          {blog._id.slice(-8)}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Author */}
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                        {blog.author?.charAt(0)}
                      </div>

                      <span className="font-medium">{blog.author}</span>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-5 py-5">
                    <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-semibold">
                      {blog.category}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        blog.status === "Published"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {blog.status}
                    </span>
                  </td>

                  {/* Created Date */}
                  <td className="px-5 py-5 text-gray-600">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-5">
                    <div className="flex justify-center gap-3">
                     

                      <button
                        onClick={() => onToggleStatus(blog._id)}
                        className="text-gray-500 hover:text-yellow-600"
                      >
                        <CheckCircle size={18} />
                      </button>

                      <button
                        onClick={() => onDelete(blog._id)}
                        className="text-gray-500 hover:text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BlogTable;
