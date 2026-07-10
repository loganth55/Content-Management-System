const jwt = require("jsonwebtoken");
const userData = require("../model/userSchema");

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
   console.log("Received Token:", token);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

   const decoded = jwt.verify(token, process.env.JWT_SECRET);
   console.log("Decoded:", decoded);

   const user = await userData.findById(decoded.id);
   console.log("User:", user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

if (user.isBlocked) {
  return res.status(403).json({
    success: false,
    message: "Your account has been blocked. Please contact the administrator.",
  });
}
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

module.exports = protect;
