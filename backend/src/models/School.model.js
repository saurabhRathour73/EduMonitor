const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },


  // 🔥 replace schoolId with this
  schoolCode: {
    type: String,
    unique: true,
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model("School", schoolSchema);