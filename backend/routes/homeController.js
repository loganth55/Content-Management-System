const express = require("express");
const router = express.Router();

const Blog = require("../model/schema");
const User = require("../model/userSchema");
const Category = require("../model/categorySchema");

router.get("/stats", async (req, res) => {
  try {
    const totalBlogs = await Blog.countDocuments({
      status: "Published",
    });

    const totalCategories = await Category.countDocuments({
      status: "Active",
    });

    const totalUsers = await User.countDocuments({
      role: "user",
      isBlocked: false,
    });

    res.status(200).json({
      success: true,
      data: {
        blogs: totalBlogs,
        categories: totalCategories,
        users: totalUsers,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
