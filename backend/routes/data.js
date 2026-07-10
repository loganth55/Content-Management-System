const express = require("express");
const router = express.Router();
const Data = require("../model/schema");
const upload = require("../uploads/upload");
const protect = require("../middleware/authMiddleware");
const Subscribe = require("../model/subscriberSchema");
const sendMail = require("../utils/sendMail");
//get all post
router.get("/", async (req, res) => {
  try {
    const getData = await Data.find({
      status: "Published",
    }).populate("userId", "name email");

    res.status(200).json(getData);
  } catch (err) {
    console.log("error saving data", err);
    res.status(500).json({ message: "error saving data" });
  }
});

//user my blogs
router.get("/myblogs", protect, async (req, res) => {
  try {
    const blogs = await Data.find({
      userId: req.user._id,
    }).populate("userId", "name email");

    res.status(200).json(blogs);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error fetching blogs",
    });
  }
});


//get related post 

router.get("/related/:category/:id", async (req, res) => {
  try {
    const { category, id } = req.params;

    const relatedBlogs = await Data
      .find({
        category: category,
        _id: { $ne: id },
      })
      .limit(3);

    res.status(200).json(relatedBlogs);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error fetching related blogs",
    });
  }
});

//get single post

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
   const getSingleData = await Data.findById(id).populate(
     "userId",
     "name email profileViews createdAt",
   );
    if (!getSingleData) {
      return res.status(404).json({ message: "data not found" });
    }
    res.status(200).json(getSingleData);
  } catch (err) {
    console.log("error saving data", err);
    res.status(500).json({ message: "error saving data" });
  }
});


//create post
router.post("/", protect, upload.single("img"), async (req, res) => {
  try {
    const createData = {
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      userId: req.user._id,
      author: req.body.author,
      img: `/uploads/${req.file.filename}`,
      description: req.body.description,
      status: req.body.status,
      publishedAt: req.body.status === "Published" ? new Date() : null,
    };

    const newData = new Data(createData);

    await newData.save();

    console.log("✅ Blog Saved Successfully");
    console.log("Status:", newData.status);

    if (newData.status === "Published") {
      const subscribers = await Subscribe.find();

      console.log("Subscribers:", subscribers.length);

      for (const subscriber of subscribers) {
        try {
          console.log("Sending email to:", subscriber.email);

          await sendMail(
            subscriber.email,
            `🚀 New Blog Published - ${newData.title}`,
            `
            <div style="font-family:Arial,sans-serif;padding:20px;">
              <h2>🚀 New Blog Published</h2>

              <p>Hello 👋</p>

              <p>A new article has been published on <b>Tech Blog</b>.</p>

              <hr>

              <h3>${newData.title}</h3>

              <p>${newData.description}</p>

              <p><b>Category:</b> ${newData.category}</p>

              <br>

              <a href="http://localhost:5173/blog/${newData._id}">
                Read Blog
              </a>

              <br><br>

              <p>Happy Reading ❤️</p>

              <p><b>Tech Blog Team</b></p>
            </div>
            `,
          );

          console.log("✅ Email Sent:", subscriber.email);
        } catch (err) {
          console.log("❌ Failed:", subscriber.email);
          console.log(err);
        }
      }
    }

    res.status(201).json(newData);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Error saving data",
    });
  }
});

//update data

router.put("/:id", protect, upload.single("img"), async (req, res) => {
  try {
    const id = req.params.id;

    // Find Blog
    const updateData = await Data.findById(id);

    if (!updateData) {
      return res.status(404).json({
        message: "Data not found",
      });
    }

    // Store old status
    const oldStatus = updateData.status;

    // Check ownership
    if (updateData.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to edit this blog",
      });
    }

    // Update fields
    updateData.title = req.body.title || updateData.title;
    updateData.content = req.body.content || updateData.content;
    updateData.category = req.body.category || updateData.category;
    updateData.author = req.body.author || updateData.author;
    updateData.description = req.body.description || updateData.description;
    updateData.status = req.body.status || updateData.status;

    if (req.file) {
      updateData.img = `/uploads/${req.file.filename}`;
    }

    if (updateData.status === "Published") {
      updateData.publishedAt = new Date();
    }

    // Save updated blog
    const updatedData = await updateData.save();

    // Send email ONLY when Draft -> Published
    if (oldStatus === "Draft" && updatedData.status === "Published") {
      const subscribers = await Subscribe.find();

      console.log("Subscribers:", subscribers.length);

      for (const subscriber of subscribers) {
        try {
          await sendMail(
            subscriber.email,
            `🚀 New Blog Published - ${updatedData.title}`,
            `
            <div style="font-family:Arial,sans-serif;padding:20px;">
              <h2>🚀 New Blog Published</h2>

              <p>Hello 👋,</p>

              <p>A new article has just been published on <b>Tech Blog</b>.</p>

              <hr>

              <h3>${updatedData.title}</h3>

              <p>${updatedData.description}</p>

              <p><b>Category:</b> ${updatedData.category}</p>

              <br>

              <a
                href="http://localhost:5173/blog/${updatedData._id}"
                style="
                  background:#2563eb;
                  color:white;
                  padding:12px 20px;
                  text-decoration:none;
                  border-radius:8px;
                "
              >
                Read Blog
              </a>

              <br><br>

              <p>Happy Reading ❤️</p>

              <p><b>Tech Blog Team</b></p>
            </div>
            `,
          );

          console.log("✅ Email sent to:", subscriber.email);
        } catch (err) {
          console.log("❌ Failed to send email:", subscriber.email);
          console.log(err);
        }
      }
    }

    res.status(200).json(updatedData);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Error updating blog",
    });
  }
});
//delete data

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteData = await Data.findByIdAndDelete(id);
    console.log(deleteData);
    res.status(200).json(deleteData);
  } catch (err) {
    console.log("error saving data", err);
    res.status(500).json({ message: "error saving data" });
  }
});

module.exports = router;

