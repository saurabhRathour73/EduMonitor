const mongoose = require("mongoose");

const schoolAdminSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true
  },

  // 🔥 which school admin belongs to
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true
  },

  // 🔥 snapshot (important for UI & history)
  name: {
    type: String,
    required: true
  },

  // 🔥 unique school code verification (VERY IMPORTANT)
  schoolCode: {
    type: String,
    required: true
  },

  role: {
    type: String,
    default: "schoolAdmin"
  },

  isVerified: {
    type: Boolean,
    default: false
  },

  isActive: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

module.exports = mongoose.model("SchoolAdmin", schoolAdminSchema);