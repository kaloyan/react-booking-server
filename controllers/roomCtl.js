// Rooms controller

const { roomSrv } = require("../services/roomSrv.js");

const getOne = async (req, res, next) => {
  const roomId = req.params.id;

  try {
    const room = await roomSrv.getOne(roomId);
    res.json(room);
  } catch (err) {
    next(err);
  }
};

const getAll = async (req, res, next) => {
  const rooms = await roomSrv.getAll();
  res.json(rooms);
};

const create = async (req, res, next) => {
  const hotelId = req.params.hotelId;

  const data = {
    title: req.body.title,
    price: Number(req.body.price),
    description: req.body.description,
    maxPeople: Number(req.body.maxPeople),
    roomNumbers: req.body.roomNumbers || [],
  };

  try {
    const room = await roomSrv.create(hotelId, data);
    res.json(room);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  const hotelId = req.params.id;
  const data = req.body;

  try {
    const hotel = await roomSrv.update(hotelId, data);
    res.json(hotel);
  } catch (err) {
    next(err);
  }
};

const del = async (req, res, next) => {
  const roomId = req.params.id;

  try {
    const result = await roomSrv.del(roomId);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.roomCtl = { getOne, getAll, create, update, del };
