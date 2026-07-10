const express = require("express");
const router = express.Router();

const Subscribe = require("../model/subscriberSchema");
const protect = require("../middleware/authMiddleware");
const sendMail = require("../utils/sendMail");
router.post("/",protect, async (req, res) => {
  try {
  const email = req.user.email;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const exists = await Subscribe.findOne({ email });

    if (exists) {
      return res.status(400).json({
        message: "You are already subscribed.",
      });
    }

    await Subscribe.create({
      email,
    });

    await sendMail(
      email,
      "🎉 Welcome to Tech Blog",
      `
    <h2>Welcome to Tech Blog 🚀</h2>

    <p>Hi there,</p>

    <p>Thank you for subscribing to <b>Tech Blog</b>.</p>

    <p>You'll now receive email notifications whenever a new blog is published.</p>

    <br>

    <p>Happy Reading! ❤️</p>

    <p><b>Tech Blog Team</b></p>
  `,
    );

    res.status(201).json({
      success: true,
      message: "Subscribed Successfully 🎉",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

module.exports = router;
