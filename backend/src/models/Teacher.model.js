const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  subject: {
    type: String
  },

  class: {
    type: String
  },

  phone: {
    type: String
  },

  // 🔥 link with school
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
    default: "teacher"
  },

  isActive: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Teacher", teacherSchema);