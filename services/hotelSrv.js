const Hotel = require("../models/Hotel.js");
const Room = require("../models/Room.js");
const User = require("../models/User");

const getAll = async (query, limit) => {
  const { min, max, ...params } = query;

  try {
    const hotels = await Hotel.find({
      ...params,
      cheepestPrice: { $gt: min || 0, $lt: max || 10000 },
    }).limit(limit);
    return hotels;
  } catch (err) {
    throw err;
  }
};

const getOwn = async (userId) => {
  try {
    const hotels = await Hotel.find({ owner: userId });
    return hotels;
  } catch (err) {
    throw err;
  }
};

const getOne = async (id) => {
  try {
    const hotel = await Hotel.findById(id);
    return hotel;
  } catch (err) {
    throw err;
  }
};

const create = async (data) => {
  try {
    const newHotel = new Hotel(data);
    await newHotel.save();

    return newHotel;
  } catch (err) {
    throw err;
  }
};

const update = async (id, data) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
    return hotel;
  } catch (err) {
    throw err;
  }
};

const del = async (id) => {

  try {
    // first find all hotels rooms and delete them
    const hotel = await Hotel.findById(id);

    for (const room of hotel.rooms) {
      await Room.findByIdAndDelete(room);
    }

    // remove hotel from user's list of own hotels
    //const owner = await User.findById(hotel.creator);
    //await User.findByIdAndUpdate(owner._id, { $pull: { hotels: hotel._id } });

    //!TODO - find all reservations and remove them, then send message to users

    // next detele the hotel
    const result = await Hotel.findByIdAndDelete(id);
    return result;
  } catch (err) {
    throw err;
  }
};

const getCount = (obj) => {
  try {
    return Hotel.countDocuments(obj);
  } catch (err) {
    throw err;
  }
};

exports.hotelSrv = { getAll, getOne, getOwn, create, update, del, getCount };
