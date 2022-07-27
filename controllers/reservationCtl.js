// Reservation Controller

const { reservationSrv } = require("../services/reservationSrv.js");

const create = async (req, res, next) => {
  const data = {
    ...req.body,
    owner: req.user.id,
  };

  try {
    const reservation = await reservationSrv.create(data);
    res.json(reservation);
  } catch (err) {
    next(err);
  }
};

const getByHotel = async (req, res, next) => {
  const hotelId = req.params.hotelId;

  try {
    const reservations = await reservationSrv.getByHotel(hotelId);
    res.json(reservations);
  } catch (err) {
    next(err);
  }
};

const getByUser = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const reservations = await reservationSrv.getByUser(userId);
    res.json(reservations);
  } catch (err) {
    next(err);
  }
};

const getByOwner = async (req, res, next) => {
  const ownerId = req.params.ownerId;

  try {
    const reservations = await reservationSrv.getByOwner(ownerId);
    res.json(reservations);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  const id = req.params.id;

  try {
    const reservations = await reservationSrv.remove(id);
    res.json(reservations);
  } catch (err) {
    next(err);
  }
};

exports.reservateCtl = { create, getByHotel, getByUser, getByOwner, remove };
