const express = require("express");
const router = express.Router();
const userData = require("../model/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const sendEmail = require("../utils/sendMail");
const crypto = require("crypto");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log(name, email);
    const existsUser = await userData.findOne({ email });

    console.log("Email:", email);
    console.log("Exists User:", existsUser);

    if (existsUser) {
      return res.status(400).json({
        message: "User already exists",
      });
      console.log(message);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userData.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "error saving data" });
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    const user = await userData.findOne({ email });
console.log("User:", user);
    // Check user first
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
console.log("Password Match:", isMatch);
    // Check password
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

 const token = jwt.sign(
   {
     id: user._id,
     role: user.role,
   },
   process.env.JWT_SECRET,
   {
     expiresIn: "2d",
   },
 );
    res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
});

router.post("/google-login", async (req, res) => {
  try {
    const { credential } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { email } = payload;

    const user = await userData.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message:
          "This Google account is not registered. Please register first.",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
    );

    res.status(200).json({
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Google Login Failed",
    });
  }
});
router.post("/logout", (req, res) => {
  res.json({
    success: true,
    message: "Logged out",
  });
});

router.get("/test-email", async (req, res) => {
  await sendEmail(
    "loganthpranav2005@gmail.com",
    "Tech Blog Test",
    `
      <h1>Hello Loganth 👋</h1>

      <p>This is your first email from your MERN Blog.</p>

      <h2>Congratulations 🎉</h2>
    `,
  );

  res.json({
    message: "Email Sent",
  });
});

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    // Check user
    const user = await userData.findOne({ email });
console.log("User:", user);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Google users cannot reset password
    if (user.provider === "google") {
      return res.status(400).json({
        success: false,
        message:
          "This account uses Google Sign-In. Please sign in with Google.",
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    console.log("Generated Token:", resetToken);

    // Hash token before saving
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    console.log("Generated Hash:", hashedToken);

    // Save hashed token
    user.resetPasswordToken = hashedToken;

    // Token expires in 15 minutes
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    await user.save();

    // Frontend URL
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    console.log("Reset URL:", resetUrl);

    // Send Email
    await sendEmail(
      user.email,
      "Reset Your Password",
      `
      <div style="font-family:Arial,sans-serif;padding:20px">
        <h2>Password Reset</h2>

        <p>Hello <b>${user.name}</b>,</p>

        <p>You requested a password reset.</p>

        <p>Click the button below to reset your password.</p>

        <a
          href="${resetUrl}"
          style="
            display:inline-block;
            padding:12px 20px;
            background:#2563eb;
            color:#fff;
            text-decoration:none;
            border-radius:8px;
          "
        >
          Reset Password
        </a>

        <p style="margin-top:20px;">
          This link expires in <b>15 minutes</b>.
        </p>

        <p>
          If you didn't request this, simply ignore this email.
        </p>
      </div>
      `,
    );

    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email.",
    });
  } catch (err) {
    console.log("Forgot Password Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("URL Token:", token);

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    console.log("Hash From URL:", hashedToken);

    // Debug: Check what's stored in database
    const debugUser = await userData.findOne({
      email: "22eca55@karpagamtech.ac.in", // <-- change to the email you're testing
    });

    if (debugUser) {
      console.log("Stored Hash:", debugUser.resetPasswordToken);
      console.log("Token Expire:", debugUser.resetPasswordExpire);
    } else {
      console.log("Debug User Not Found");
    }

    const user = await userData.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });

    console.log("Matched User:", user);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Password reset successful. Please login with your new password.",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;

