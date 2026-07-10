import React from "react";
import { useState } from "react";


function ImageUploader({
  img,
  setImg,
  content,
  setContent,
  publishBlog,
  oldImg,
}) {

   const IMAGE_BASE_URL = import.meta.env.VITE_API_URL;
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-3">
        Featured Image
      </label>

      <label className="block cursor-pointer group">
        <label className="block cursor-pointer group">
          {img || oldImg ? (
            <>
              <div className="relative w-full h-64 rounded-2xl overflow-hidden border border-slate-300 group">
                <img
                 src={
                          img? URL.createObjectURL(img): `${IMAGE_BASE_URL}${oldImg}`}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <span className="px-5 py-2 rounded-xl bg-white font-medium text-slate-800">
                    Preview Image
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-5 flex justify-center gap-4">
                {/* Change Image */}
                <label className="cursor-pointer">
                  <span className="w-48 h-12 inline-flex items-center justify-center rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition duration-300">
                    Change Image
                  </span>

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setImg(e.target.files[0])}
                  />
                </label>

                {/* Remove Image */}
                <button
                  type="button"
                  onClick={() => setImg(null)}
                  className="w-48 h-12 rounded-xl border border-red-300 text-red-600 font-medium hover:bg-red-50 transition duration-300"
                >
                  Remove Image
                </button>
              </div>
            </>
          ) : (
            <div className="w-full h-64 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-slate-900 transition-all duration-300 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white shadow flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-slate-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-slate-700 transition-all duration-300 group-hover:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 16l5-5 4 4 6-8 3 4v7H3z"
                  />
                </svg>
              </div>

              <h2 className="text-xl font-semibold text-slate-900">
                Upload Featured Image
              </h2>

              <p className="mt-2 text-slate-500">
                Click to browse your computer
              </p>

              <p className="text-sm text-slate-400 mt-1">PNG, JPG or JPEG</p>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </label>
      </label>

      {/* Blog Content */}
      <div className="max-w-5xl mx-auto px-6 py-10 mt-10">
        <label className="block text-sm font-semibold text-slate-700 mb-3">
          Blog Content
        </label>

        <textarea
          rows={16}
          placeholder="Start writing your amazing article..."
          className="w-full rounded-2xl border border-slate-300 px-5 py-5 resize-none outline-none transition duration-300 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="mt-10 flex justify-end gap-4">
        <button className="px-8 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 transition">
          Cancel
        </button>

        <button
          onClick={publishBlog}
          className="px-8 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition"
        >
          Publish Blog
        </button>
      </div>
    </div>
  );
}

export default ImageUploader;
