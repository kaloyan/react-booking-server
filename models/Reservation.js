const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },

  rooms: {
    type: [Number],
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

module.exports = mongoose.model("Reservation", reservationSchema);
