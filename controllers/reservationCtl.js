// Reservation Controller

const { reservationSrv } = require("../services/reservationSrv.js");

const create = async (req, res, next) => {
	if (!req.user?.id) return next({error: "Access denied"})

  const data = {
    ...req.body,
    user: req.user.id,
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

const getOne = async (req, res, next) => {
  const reservationId = req.params.reservationId;

  try {
    const reservation = await reservationSrv.getOne(reservationId);
    res.json(reservation);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  const reservationId = req.params.reservationId;

  try {
    const reservations = await reservationSrv.remove(reservationId);
    res.json(reservations);
  } catch (err) {
    next(err);
  }
};

exports.reservateCtl = { create, getByHotel, getByUser, getByOwner, getOne, remove };

