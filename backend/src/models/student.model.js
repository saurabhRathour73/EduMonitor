const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },

  enrollmentNumber: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  class: {
    type: String,
    required: true
  },

  section: {
    type: String
  },

  rollNumber: {
    type: String
  },

  // 🔥 Parent relation
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Parent"
  },

  // 🔥 Teacher who created
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher"
  },

  // 🔥 School relation (VERY IMPORTANT)
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true
  },

  name: {
    type: String
  },

  role: {
    type: String,
    default: "student"
  },

  isActive: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);