const mongoose = require("mongoose")

const dataSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userSchema",
      required: true,
    },

    author: { type: String },
    description: { type: String, required: true },
    status: { type: String },
    img: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    publishedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("schema" , dataSchema)