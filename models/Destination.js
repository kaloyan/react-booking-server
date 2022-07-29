const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, "This destination already exist."],
    required: [true, "Destination name is required"],
  },

  image: {
    type: String,
    required: [true, "Destination image is required"],
  },

  description: {
    type: String,
    required: [true, "Description is required"],
  },

  featured: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Destination", destinationSchema);
