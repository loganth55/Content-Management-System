const express = require("express")
const router = express.Router()

const dashboard = require("../model/schema")
const protect = require("../middleware/authMiddleware")
const Comment = require("../model/commentSchema")

router.get('/stats',protect,async(req,res)=>{
    try{
        const totalBlogs = await dashboard.countDocuments({
            userId:req.user._id

        })
        const totalPublished = await dashboard.countDocuments({
            userId:req.user._id,
            status:"Published"
        })
        const totalDrafts = await dashboard.countDocuments({
            userId:req.user._id,
            status:"Draft"
        })
        const totalComments = await Comment.countDocuments({
            userId:req.user._id,
        })
        res.status(200).json({
            totalBlogs,
            totalPublished,
            totalDrafts,
            totalComments
        })
    }
    catch(err){
        res.status(500).json({message:"Server Error"})
    }

})

router.get("/monthly-blogs", protect, async (req, res) => {
  try {
     const year = req.query.year || new Date().getFullYear();
     console.log("Year from frontend:", req.query.year);
    const monthlyBlogs = await dashboard.aggregate([
      {
        $match: {
          userId: req.user._id,
          createdAt: {
            $gte: new Date(`${year}-01-01`),
            $lt: new Date(`${Number(year) + 1}-01-01`),
          },
        },
      },
      {
        $group: {
          _id: {
            month: {
              $month: "$createdAt",
            },
          },

          blogs: {
            $sum: 1,
          },

          published: {
            $sum: {
              $cond: [{ $eq: ["$status", "Published"] }, 1, 0],
            },
          },

          drafts: {
            $sum: {
              $cond: [{ $eq: ["$status", "Draft"] }, 1, 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          month: "$_id.month",
          blogs: 1,
          published: 1,
          drafts: 1,
        },
      },
      {
        $sort: {
          month: 1,
        },
      },
    ]);

    const months = [
      "",
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

    const chartData = monthlyBlogs.map((item) => ({
      month: months[item.month],
      blogs: item.blogs,
      published: item.published,
      drafts: item.drafts,
    }));

    res.status(200).json(chartData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.get("/top-categories", protect, async (req, res) => {
  try {
     const topCategories = await dashboard.aggregate([
    {
      $match:{
        userId:req.user._id
      }
    },
    {
      $group:{
        _id:"$category",
         total:{
          $sum:1
         }
      }
    },
    {
     $project:{
      _id:0,
      category:"$_id",
      total:1
     }
    },
    {
      $sort:{
        total:-1
      }
    },
])
 res.status(200).json(topCategories)
  }
  
  
  catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router

  
        
