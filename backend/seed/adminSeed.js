const bcrypt = require("bcryptjs");
const User = require("../model/userSchema");

const seedAdmin = async () => {
  try {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    const admin = await User.findOne({
      email: process.env.ADMIN_EMAIL,
    });

    if (admin) {
      admin.name = process.env.ADMIN_NAME;
      admin.password = hashedPassword;
      admin.role = "admin";

      await admin.save();

      console.log("✅ Admin updated successfully.");
      return;
    }

 const createdAdmin = await User.create({
   name: process.env.ADMIN_NAME,
   email: process.env.ADMIN_EMAIL,
   password: hashedPassword,
   role: "admin",
 });

 console.log("Created Admin:", createdAdmin);
    console.log("Created Admin:", admin);
    console.log("✅ Admin account created successfully.");
  } catch (error) {
    console.log("❌ Admin seed failed:", error.message);
  }
};

module.exports = seedAdmin;
