const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  arrive: {
    type: String,
    required: true,
  },

  leave: {
    type: String,
    required: true,
  },

  guests: {
    type: Number,
    required: true,
  },

  comment: {
    type: String,
    default: "",
  },

  price: {
    type: Number,
    required: true,
  },

  date: {
    type: String,
    default: new Date().toDateString(),
  },
});

module.exports = mongoose.model("reservation", reservationSchema);
