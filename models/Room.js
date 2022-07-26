const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Room's title is required"],
  },

  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Minumum price is 0 USD"],
    max: [10000, "Maximum price is 10000 USD"],
  },

  description: {
    type: String,
    required: [true, "Room description is required"],
  },

  maxPeople: {
    type: Number,
    min: [1, "Minimum people is 1"],
    max: [20, "Maximum people is 20"],
    required: [true, "MaxPeople is required"],
  },

  roomNumbers: {
    type: [Number],
    default: [],
  },
});

module.exports = mongoose.model("Room", roomSchema);
