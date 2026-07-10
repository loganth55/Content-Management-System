const mongoose = require("mongoose");

const profileViewSchema = new mongoose.Schema(
  {
    viewerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userSchema",
      required: true,
    },
    profileOwnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userSchema",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("ProfileView", profileViewSchema);
