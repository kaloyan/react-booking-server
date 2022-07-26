// Users model

const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      minLength: [3, "Username must be at least 3 characters long"],
      maxLength: [30, "Username is too long"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email {VALUE} already exist"],
    },

    phone: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    gender: {
      type: String,
      default: "",
      enum: ["", "male", "female"],
    },

    birthday: {
      type: String,
      default: "",
    },

    password: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["user", "owner", "admin"],
      default: "user",
    },

    messages: {
      type: [Object],
      default: [
        {
          msg: "Welcomme to our website.",
          unread: true,
          id: uuid(),
          time: Date.now(),
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
