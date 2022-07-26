// Rooms service

const Room = require("../models/Room.js");
const Hotel = require("../models/Hotel.js");

const create = async (hotelId, roomData) => {
  try {
    const newRoom = new Room(roomData);
    await newRoom.save();

    // add the room to the hotel
    await Hotel.findByIdAndUpdate(hotelId, {
      $push: {
        rooms: newRoom._id,
      },
    });

    return newRoom;
  } catch (err) {
    throw err;
  }
};

const getOne = async (roomId) => {
  try {
    const room = await Room.findById(roomId);
    return room;
  } catch (err) {
    throw err;
  }
};

const getAll = async () => {
  try {
    const rooms = await Room.find({});
    return rooms;
  } catch (err) {
    throw err;
  }
};

const update = async (roomId, roomData) => {
  try {
    const room = Room.findByIdAndUpdate(
      roomId,
      { $set: roomData },
      { new: true }
    );
    return room;
  } catch (err) {
    throw err;
  }
};

const del = async (roomId) => {
  try {
  	//!TODO send messages to all users that have reservation in that room
  
    const result = await Room.findByIdAndDelete(roomId);

    await Hotel.findOneAndUpdate(
      { rooms: {$in: [roomId]} },
      { $pull: { rooms: roomId } }
    );

    return result;
  } catch (err) {
    throw err;
  }
};

exports.roomSrv = { create, getOne, getAll, update, del };
