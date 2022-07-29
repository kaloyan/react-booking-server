const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  comment: {
    type: String,
    required: true,
  },

  rating: {
    type: Number,
    min: 1,
    max: 5,
  },

  date: {
    type: String,
    default: new Date().toDateString(),
  },
});

module.exports = mongoose.model("Review", reviewSchema);
