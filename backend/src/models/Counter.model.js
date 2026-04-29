const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },

  className: {
    type: String,
    required: true
  },

  section: {
    type: String,
    required: true
  },

  year: {
    type: Number,
    required: true
  },

  sequence: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Counter", counterSchema);