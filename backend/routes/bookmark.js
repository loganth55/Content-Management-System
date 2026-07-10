const express = require("express");
const router = express.Router();

const Bookmark = require("../model/bookmarkSchema");
const protect = require("../middleware/authMiddleware");

// Save Bookmark
router.post("/:blogId", protect, async (req, res) => {
  try {
    const { blogId } = req.params;

    // Check if already bookmarked
    const existingBookmark = await Bookmark.findOne({
      userId: req.user._id,
      blogId: blogId,
    });

    if (existingBookmark) {
      return res.status(400).json({
        message: "Blog already bookmarked",
      });
    }

    // Create bookmark
    const bookmark = await Bookmark.create({
      userId: req.user._id,
      blogId: blogId,
    });

    res.status(201).json({
      message: "Bookmark added successfully",
      bookmark,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

// Get All Bookmarks
router.get("/", protect, async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({
      userId: req.user._id,
    }).populate("blogId");

    res.status(200).json(bookmarks);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});
router.delete("/:blogId", protect, async (req, res) => {
  try {
    const { blogId } = req.params;

    await Bookmark.findOneAndDelete({
      userId: req.user._id,
      blogId,
    });

    res.status(200).json({
      message: "Bookmark Removed",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;
