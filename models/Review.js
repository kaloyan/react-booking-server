const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
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
    type: Number,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Review", reviewSchema);
