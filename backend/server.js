require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const protect = require("./middleware/authMiddleware");
const routes = require("./routes/data");
const cookieParser = require("cookie-parser");
const homeRoutes = require("./routes/homeController");
const commentRoutes = require("./routes/commentController");
const subscriberRoutes = require("./routes/subscriberController");

const authRoutes = require("./routes/authController");
const profileRoutes = require("./routes/profileController");
const adminRoutes = require("./routes/adminRoutes")
const app = express();

const dashboardRoutes = require("./routes/dashboard");
const bookmarkRoute = require("./routes/bookmark");
const seedAdmin = require("./seed/adminSeed");

const PORT = process.env.PORT || 8000;

//middlewares
app.use(
  cors({
    origin: ["http://localhost:5173", "https://cms-blog-platform.netlify.app"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/data", routes);

app.use("/api/admin", adminRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api", commentRoutes);
app.use("/api/subscribe", subscriberRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/bookmark", bookmarkRoute);
app.use("/api/profile", profileRoutes);
app.use("/api/admin", adminRoutes);
app.get("/profile", protect, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to profile page",
    user: req.user,
  });
});

app.get("/dashboard", protect, (req, res) => {
  res.json({
    success: true,
    message: "Dashboard Access Granted",
  });
});

//mongodb connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Database Connected");

    await seedAdmin();
  })
  .catch((err) => {
    console.log("❌ Error connecting to DB", err);
  });

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
