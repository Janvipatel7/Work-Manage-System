const mongoose = require("mongoose");

const workSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // manager who created
  },

  assignedToManager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // manager assigned by admin
    default: null,
  },

  assignedToMember: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // member assigned by manager
    default: null,
  },

  status: {
    type: String,
    enum: ["pending", "assigned", "in-progress", "completed"],
    default: "pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Work", workSchema);
