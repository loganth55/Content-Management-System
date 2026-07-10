import { useState, useEffect } from "react";

function CategoryModal({
  open,
  setOpen,
  formData,
  setFormData,
  image,
  setImage,
  handleCreateCategory,
  handleUpdateCategory,
  editData,
}) {
  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name,
        description: editData.description,
        status: editData.status,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        status: "Active",
      });

      setImage(null);
     
    }
     console.log(editData);
  }, [editData,setFormData, setImage]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-xl p-6">
        <h2 className="text-2xl font-bold">
          {editData ? "Edit Category" : "Add Category"}
        </h2>

        <p className="text-gray-500 mt-1">
          {editData ? "Update category information." : "Create a new category."}
        </p>

        <div className="space-y-5 mt-6">
          {/* Category Name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Category Name
            </label>

            <input
              type="text"
              placeholder="Enter category name"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>

            <textarea
              rows={4}
              placeholder="Enter category description"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>

            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Category Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full border border-gray-300 rounded-xl px-4 py-3"
            />
          </div>

          {/* Preview */}
          {image && (
            <div>
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="w-32 h-32 rounded-xl object-cover border"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={() => setOpen(false)}
            className="px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={editData ? handleUpdateCategory : handleCreateCategory}
            className="px-5 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700"
          >
            {editData ? "Update Category" : "Create Category"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoryModal;
