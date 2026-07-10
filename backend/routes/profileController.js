const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const userData = require("../model/userSchema");
const Data = require("../model/schema");
const ProfileView = require("../model/profileViewSchema");

router.get("/:id", protect, async (req, res) => {
  try {
    const profileId = req.params.id;

    const profile = await userData.findById(profileId);


    if (!profile) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Don't count your own profile view
    if (req.user._id.toString() !== profileId) {
      const alreadyViewed = await ProfileView.findOne({
        viewerId: req.user._id,
        profileOwnerId: profileId,
      });

      if (!alreadyViewed) {
        profile.profileViews += 1;
        await profile.save();

        await ProfileView.create({
          viewerId: req.user._id,
          profileOwnerId: profileId,
        });
      }
    }

    // Dashboard Data
    const totalBlogs = await Data.countDocuments({
      userId: profileId,
    });

    const publishedBlogs = await Data.countDocuments({
      userId: profileId,
      status: "Published",
    });

    const draftBlogs = await Data.countDocuments({
      userId: profileId,
      status: "Draft",
    });

    const recentBlogs = await Data.find({
      userId: profileId,
      status: "Published",
    })
      .sort({ createdAt: -1 })
      .limit(5);
const totalCategories = await Data.distinct("category", {
  userId: profileId,
  status: "Published",
});
       const monthNames = [
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

       const monthlyBlogsData = await Data.aggregate([
         {
           $match: {
             userId: profile._id,
             status: "Published",
           },
         },
         {
           $addFields: {
             graphDate: {
               $ifNull: ["$publishedAt", "$createdAt"],
             },
           },
         },
         {
           $group: {
             _id: { $month: "$graphDate" },
             blogs: { $sum: 1 },
           },
         },
       ]);

       const monthlyBlogs = monthNames.map((month, index) => {
         const found = monthlyBlogsData.find((item) => item._id === index + 1);

         return {
           month,
           blogs: found ? found.blogs : 0,
         };
       });
                const creatorScore = publishedBlogs * 10 + profile.profileViews;

    res.status(200).json({
      profile: {
        _id: profile._id,
        name: profile.name,
        email: profile.email,
        profileViews: profile.profileViews,
        createdAt: profile.createdAt || null,
      },

      stats: {
        totalBlogs,
        publishedBlogs,
        draftBlogs,
        totalCategories: totalCategories.length,
        creatorScore,
      },

      monthlyBlogs,
      recentBlogs,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;
