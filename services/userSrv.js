const User = require("../models/User.js");
const Hotel = require("../models/Hotel.js");
const Reservation = require("../models/Reservation");
const bcrypt = require("bcrypt");
const { v4: uuid } = require("uuid");

const getUser = async (id) => {
  try {
    const user = await User.findById(id).lean();
    return user;
  } catch (err) {
    throw err;
  }
};

const getUserCounts = async (userId) => {
  try {
    const response = {};

    response.hotels = await Hotel.countDocuments({ owner: userId });
    response.reservations = await Reservation.countDocuments({ user: userId });

    return response;
  } catch (err) {
    throw err;
  }
};

const getAll = async () => {
  try {
    const users = await User.find({}).lean();
    return users;
  } catch (err) {
    throw err;
  }
};

const updateUser = async (id, data) => {
  if (data.password) {
    const hashPass = await bcrypt.hash(data.password, 10);
    data.password = hashPass;
  }

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );

    const mesg = await User.findByIdAndUpdate(id, {
      $push: {
        messages: {
          msg: `Your account was update successfull on ${new Date()}`,
          unread: true,
          id: uuid(),
          time: Date.now(),
        },
      },
    });

    return user;
  } catch (err) {
    throw err;
  }
};

const delUser = async (id) => {
	//!TODO - remove all users hotels and reservations and rooms

  try {
    await User.findByIdAndDelete(id);
    const users = await User.find({}).lean();
    return users;
  } catch (err) {
    throw err;
  }
};

const delMsg = async (userId, msgId) => {
  try {
    const user = await User.findById(userId);

    await User.findByIdAndUpdate(userId, {
      $set: { messages: user.messages.filter((x) => x.id !== msgId) },
    });

    const response = await User.findById(userId);
    return response;
  } catch (err) {
    throw err;
  }
};

const readMsg = async (userId, msgId) => {
  //todo
};

exports.userSrv = {
  getAll,
  getUser,
  getUserCounts,
  updateUser,
  delUser,
  delMsg,
  readMsg,
};
