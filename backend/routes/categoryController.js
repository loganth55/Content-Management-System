const categoryData = require("../model/categorySchema");
const Blog = require("../model/schema");

// Get Categories

const getUserCategories = async (req, res) => {
  try {
    const categories = await categoryData.find({
      status: "Active",
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getCategories = async (req, res) => {
  try {
    // Cards
    const totalCategories = await categoryData.countDocuments();

    const activeCategories = await categoryData.countDocuments({
      status: "Active",
    });

    const blogsAssigned = await Blog.countDocuments();

    const CATEGORY_TARGET = 200;
    const ACTIVE_TARGET = 200;
    const BLOG_TARGET = 500;

    const totalCategoryGrowth = Number(
      (totalCategories / CATEGORY_TARGET) * 100,
    ).toFixed(1);

    const activeCategoryGrowth = Number(
      (activeCategories / ACTIVE_TARGET) * 100,
    ).toFixed(1);

    const blogsAssignedGrowth = Number(
      (blogsAssigned / BLOG_TARGET) * 100,
    ).toFixed(1);

 

    // Category List


    const page = Number(req.query.page) || 1;

    const limit = 10;

    const skip = (page - 1) * limit;

    const search = req.query.search || "";

    const status = req.query.status || "";

    const filter = {};

    const andConditions = [];

    if (search) {
      andConditions.push({
        $or: [
          {
            name: {
              $regex: search,
              $options: "i",
            },
          },
          {
            description: {
              $regex: search,
              $options: "i",
            },
          },
        ],
      });
    }
    if (status) {
      andConditions.push({
        status,
      });
    }

    if (andConditions.length > 0) {
      filter.$and = andConditions;
    }

 const categories = await categoryData.aggregate([
   {
     $match: filter,
   },
   {
     $lookup: {
       from: "schemas", // Blog collection
       localField: "name",
       foreignField: "category",
       as: "blogs",
     },
   },
   {
     $addFields: {
       totalBlogs: {
         $size: "$blogs",
       },
     },
   },
   {
     $project: {
       blogs: 0,
     },
   },
   {
     $sort: {
       createdAt: -1,
     },
   },
   {
     $skip: skip,
   },
   {
     $limit: limit,
   },
 ]);
 const total = await categoryData.countDocuments(filter);

    const pagination = {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalCategories: total,
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1,
    };

   const cards = {
  totalCategories,
  activeCategories,
  blogsAssigned,

  totalCategoryGrowth,
  activeCategoryGrowth,
  blogsAssignedGrowth,
};

       
    res.status(200).json({
      success: true,
      message: "Categories fetched successfully.",
      data: {
        cards,
        categories,
        pagination
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Create Category
const createCategory = async (req, res) => {
  try {
    const category = await categoryData.create({
      name: req.body.name,
      description: req.body.description,
      status: req.body.status || "Active",
      img: `/uploads/${req.file.filename}`,
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully.",
      data: category,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get Single Category
const getCategory = async (req, res) => {
  try {
    const category = await categoryData.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Update Category
const updateCategory = async (req, res) => {
  try {
    const category = await categoryData.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    category.name = req.body.name || category.name;
    category.description = req.body.description || category.description;

    category.status = req.body.status || category.status;

    if (req.file) {
      category.img = `/uploads/${req.file.filename}`;
    }

    await category.save();

    res.status(200).json({
      success: true,
      message: "Category updated successfully.",
      data: category,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Delete Category
const deleteCategory = async (req, res) => {
  try {
    const category = await categoryData.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    await categoryData.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully.",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getUserCategories,
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
