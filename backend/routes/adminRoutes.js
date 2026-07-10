const express = require("express");
const router = express.Router();
const mongoose =  require('mongoose')
const User = require("../model/userSchema");
const Blog = require("../model/schema");
const Category = require("../model/categorySchema");
const Comment = require("../model/commentSchema");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const {
  getUserCategories,
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("./categoryController");
const upload = require("../uploads/upload");

const {
  getUsers,

  deleteUser,
  toggleUserStatus,
} = require("./usersController");

const {getBlogs,deleteBlog,toggleBlogStatus} = require("./blogsController");

// GET Dashboard Statistics
router.get("/dashboard", async (req, res) => {

  try {

    const days = ["", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];



    const totalUsers = await User.countDocuments();

    const totalBlogs = await Blog.countDocuments();

    const totalCategories = await Category.countDocuments();

    const totalComments = await Comment.countDocuments();

        const USER_TARGET = 2000;
        const BLOG_TARGET = 2000;
        const CATEGORY_TARGET = 100;
        const COMMENT_TARGET = 5000;

    const today = new Date();
    const last7Days = new Date();
    last7Days.setDate(today.getDate() - 7);
    const previous7Days = new Date();
    previous7Days.setDate(today.getDate() - 14);
    const currentUsers = await User.countDocuments({
      createdAt: {
        $gte: last7Days,
        $lt: today,
      },
    });
    const previousUsers = await User.countDocuments({
      createdAt: {
        $gte: previous7Days,
        $lt: last7Days,
      },
    });

 const userGrowth = Math.min(
   Number(((totalUsers / USER_TARGET) * 100).toFixed(1)),
   100,
 );

    const currentBlogs = await Blog.countDocuments({
      createdAt: {
        $gte: last7Days,
        $lt: today,
      },
    });
    const previousBlogs = await Blog.countDocuments({
      createdAt: {
        $gte: previous7Days,
        $lt: last7Days,
      },
    });

   const blogGrowth = Math.min(
     Number(((totalBlogs / BLOG_TARGET) * 100).toFixed(1)),
     100,
   );

    const currentComments = await Comment.countDocuments({
      createdAt: {
        $gte: last7Days,
        $lt: today,
      },
    });
    const previousComments = await Comment.countDocuments({
      createdAt: {
        $gte: previous7Days,
        $lt: last7Days,
      },
    });

    const commentGrowth = Math.min(
      Number(((totalComments / COMMENT_TARGET) * 100).toFixed(1)),
      100,
    );

    const currentCategories = await Category.countDocuments({
      createdAt: {
        $gte: last7Days,
        $lt: today,
      },
    });
    const previousCategories = await Category.countDocuments({
      createdAt: {
        $gte: previous7Days,
        $lt: last7Days,
      },
    });

   const categoryGrowth = Math.min(
     Number(((totalCategories / CATEGORY_TARGET) * 100).toFixed(1)),
     100,
   );


        const userTrend = await User.aggregate([
          {
            $match: {
              createdAt: {
                $gte: last7Days,
                $lt: today,
              },
            },
          },
          {
            $group: {
              _id: {
                $dayOfWeek: "$createdAt",
              },

              users: {
                $sum: 1,
              },
            },
          },
          {
            $sort: {
              _id: 1,
            },
          },
        ]);
       const formattedUsers = days.slice(1).map((day, index) => {
         const user = userTrend.find((item) => item._id === index + 1);

         return {
           day,
           users: user ? user.users : 0,
         };
       });

        const blogTrend = await Blog.aggregate([
          {
            $match: {
              createdAt: {
                $gte: last7Days,
                $lt: today,
              },
            },
          },
          {
            $group: {
              _id: {
                $dayOfWeek: "$createdAt",
              },

              blogs: {
                $sum: 1,
              },
            },
          },
          {
            $sort: {
              _id: 1,
            },
          },
        ]);

        const formattedBlogs = blogTrend.map((item) => ({
          day: days[item._id],
          blogs: item.blogs,
        }));

        const categoryTrend = await Category.aggregate([
          {
            $match: {
              createdAt: {
                $gte: last7Days,
                $lt: today,
              },
            },
          },
          {
            $group: {
              _id: {
                $dayOfWeek: "$createdAt",
              },

              categories: {
                $sum: 1,
              },
            },
          },
          {
            $sort: {
              _id: 1,
            },
          },
        ]);

        const formattedCategories = days.slice(1).map((day, index) => {
          const category = categoryTrend.find((item) => item._id === index + 1);

          return {
            day,
            categories: category ? category.categories : 0,
          };
        });
 
        const commentTrend = await Comment.aggregate([
          {
            $match: {
              createdAt: {
                $gte: last7Days,
                $lt: today,
              },
            },
          },
          {
            $group: {
              _id: {
                $dayOfWeek: "$createdAt",
              },

              comments: {
                $sum: 1,
              },
            },
          },
          {
            $sort: {
              _id: 1,
            },
          },
        ]);

    const formattedComments = days.slice(1).map((day, index) => {
      const comment = commentTrend.find((item) => item._id === index + 1);

      return {
        day,
        comments: comment ? comment.comments : 0,
      };
    });

 


    const usersPerMonth = await User.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          users: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const blogsPerMonth = await Blog.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          blogs: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const trafficOverview = await Blog.aggregate([
      {
        $group: {
          _id: {
            $dayOfWeek: "$createdAt",
          },
          blogs: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    const weeklyBlogs = await Blog.aggregate([
      {
        $group: {
          _id: {
            $dayOfWeek: "$createdAt",
          },
          blogs: {
            $sum: 1,
          },
        },
      },

      {
        $sort: { _id: 1 },
      },
    ]);
    

    const topCategories = await Blog.aggregate([
      {
        $group: {
          _id: "$category",
          totalBlogs: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          totalBlogs: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);
    const formattedTopCategories = topCategories.map((item) => ({
      category: item._id,
      blogs: item.totalBlogs,
    }));

    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .select("name createdAt");

    const recentBlogs = await Blog.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .select("title author createdAt");

    const recentActivity = [
      ...recentUsers.map((user) => ({
        type: "user",
        message: `${user.name} joined the platform`,
        createdAt: user.createdAt,
      })),

      ...recentBlogs.map((blog) => ({
        type: "blog",
        message: `${blog.author} published "${blog.title}"`,
        createdAt: blog.createdAt,
      })),
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const contentDistribution = [
      {
        name: "Users",
        value: totalUsers,
      },
      {
        name: "Blogs",
        value: totalBlogs,
      },
      {
        name: "Categories",
        value: totalCategories,
      },
      {
        name: "Comments",
        value: totalComments,
      },
    ];


const weeklyPlatformActivity = days.map((day) => {
  const user = formattedUsers.find((item) => item.day === day);

  const blog = formattedBlogs.find((item) => item.day === day);

  const comment = formattedComments.find((item) => item.day === day);

  return {
    day,
    users: user ? user.users : 0,
    blogs: blog ? blog.blogs : 0,
    comments: comment ? comment.comments : 0,
  };
});


    res.status(200).json({
      success: true,
      message: "Dashboard fetched successfully.",
      data: {
        cards: {
          users: {
            total: totalUsers,
            growth: Number(userGrowth.toFixed(1)),
            trend: formattedUsers,
          },

          blogs: {
            total: totalBlogs,
            growth: Number(blogGrowth.toFixed(1)),
            trend:formattedBlogs,
          },

          categories: {
            total: totalCategories,
            growth: Number(categoryGrowth.toFixed(1)),
            trend:formattedCategories,
          },

          comments: {
            total: totalComments,
            growth: Number(commentGrowth.toFixed(1)),
            trend: formattedComments,
          },
        },
        trafficOverview,
        weeklyPlatformActivity,
        topCategories: formattedTopCategories,
        contentDistribution,
        recentActivity,
      },
    });

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const platformTrafficOverview = months.map((month, index) => {
      const userData = usersPerMonth.find((item) => item._id === index + 1);

      const blogData = blogsPerMonth.find((item) => item._id === index + 1);

      return {
        month,
        users: userData ? userData.users : 0,
        blogs: blogData ? blogData.blogs : 0,
      };
    });

    console.log({
      currentUsers,
      previousUsers,
      userGrowth,
    });

  } catch (error) {
    console.error("Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics.",
    });
  }
});

router.get("/users", getUsers);


router.patch("/users/:id/block",protect,adminOnly, toggleUserStatus);

router.delete("/users/:id", protect, adminOnly, deleteUser);

router.get("/blogs", protect, adminOnly, getBlogs);

router.delete("/blogs/:id", protect, adminOnly, deleteBlog);

router.patch("/blogs/:id/status", protect, adminOnly, toggleBlogStatus);

router.get("/categories", protect, adminOnly, getCategories);

router.get("/categories/:id", protect, adminOnly, getCategory);

router.get("/public/categories", getUserCategories);

router.post(
  "/categories",
  protect,
  adminOnly,
  upload.single("img"),
  createCategory,
);

router.put(
  "/categories/:id",
  protect,
  adminOnly,
  upload.single("img"),
  updateCategory,
);

router.delete("/categories/:id", protect, adminOnly, deleteCategory);

module.exports = router;
