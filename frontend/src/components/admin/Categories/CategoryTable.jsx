import { Pencil, Trash2 } from "lucide-react";

function CategoryTable({ categories, onEdit, onDelete }) {
  
  const apiUrl = import.meta.env.VITE_API_URL;
  return (
    <div className="w-full min-w-0 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b">
        <h2 className="text-xl font-bold">Category List</h2>

        <p className="text-gray-500 text-sm mt-1">
          Manage all blog categories.
        </p>
      </div>

      {/* ================= Mobile View ================= */}

      <div className="md:hidden space-y-4 p-4">
        {categories.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No Categories Found
          </div>
        ) : (
          categories.map((category) => (
            <div
              key={category._id}
              className="border rounded-2xl p-4 shadow-sm"
            >
              {/* Top */}

              <div className="flex gap-4">
                <img
                  src={`${apiUrl}${category.img}`}
                  alt={category.name}
                  className="w-16 h-16 rounded-xl object-cover border"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{category.name}</h3>

                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                      category.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {category.status}
                  </span>
                </div>
              </div>

              {/* Description */}

              <div className="mt-4">
                <p className="text-xs text-gray-500">Description</p>

                <p className="mt-1 text-sm text-gray-700">
                  {category.description}
                </p>
              </div>

              {/* Details */}

              <div className="grid grid-cols-2 gap-4 mt-5">
                <div>
                  <p className="text-xs text-gray-500">Blogs</p>

                  <p className="font-semibold">{category.totalBlogs}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Created</p>

                  <p className="font-semibold">
                    {new Date(category.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Buttons */}

              <div className="flex justify-end gap-3 mt-5">
                <button
                  onClick={() => onEdit(category)}
                  className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center"
                >
                  <Pencil size={18} />
                </button>

                <button
                  onClick={() => onDelete(category._id)}
                  className="w-10 h-10 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="text-left text-gray-600 text-sm">
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Blogs</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Created</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-gray-500">
                  No Categories Found
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr
                  key={category._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  {/* Category */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <img
                        src={`${apiUrl}${category.img}`}
                        alt={category.name}
                        className="w-14 h-14 rounded-xl object-cover border"
                      />

                      <div>
                        <p className="font-semibold text-gray-900">
                          {category.name}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Description */}
                  <td className="px-6 py-5 text-gray-600 max-w-xs">
                    <p className="line-clamp-2">{category.description}</p>
                  </td>

                  {/* Blogs */}
                  <td className="px-6 py-5 font-semibold">
                    {category.totalBlogs}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        category.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {category.status}
                    </span>
                  </td>

                  {/* Created */}
                  <td className="px-6 py-5 text-gray-600">
                    {new Date(category.createdAt).toLocaleDateString()}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-5">
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => onEdit(category)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => onDelete(category._id)}
                        className="text-red-600 hover:text-red-700"
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

export default CategoryTable;
