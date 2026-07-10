const express= require('express')
const router = express.Router()
const commentData = require('../model/commentSchema')
const protect = require("../middleware/authMiddleware");
router.get("/comment/:postId", async (req, res) => {
  try {
    const comments = await commentData
      .find({ postId: req.params.postId })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error fetching comments",
    });
  }
});

router.post("/comment", protect, async (req, res) => {
  try {
    const newComment = await commentData.create({
      userId: req.user._id,
      postId: req.body.postId,
      comment: req.body.comment,
    });

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.delete('/comment/:id',async(req,res)=>{
    try {
       const id = req.params.id
       const deleteComment = await commentData.findByIdAndDelete(id)
    res.status(200).json(deleteComment)   
    } 
    catch (err) {
      console.log("error saving data", err);
      res.status(500).json({ message: "error saving data" });
    }
})

module.exports = router;