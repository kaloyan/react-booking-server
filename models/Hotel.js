const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },

  type: {
    type: String,
    enum: ["hotel", "villa", "resort", "apartment", "cabin"],
    required: [true, "Type is required"],
  },

  country: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: [true, "Ciry is required"],
  },

  address: {
    type: String,
    required: [true, "Address is required"],
  },

  pictures: {
    type: [String],
    default: [],
  },

  description: {
    type: String,
    required: [true, "Description is required"],
  },

  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },

  rooms: {
    type: [mongoose.Types.ObjectId],
    ref: "Room",
    default: [],
  },

  reservations: {
    type: [mongoose.Types.ObjectId],
    ref: "Reservation",
    default: [],
  },

  reviews: {
    type: [mongoose.Types.ObjectId],
    ref: "Review",
    default: [],
  },

  cheepestPrice: {
    type: Number,
    min: 1,
    required: [true, "Cheapest room price is required"],
  },

  featured: {
    type: Boolean,
    default: false,
  },

  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("hotel", hotelSchema);
