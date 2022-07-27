const Reservation = require("../models/Reservation.js");
const User = require("../models/User.js");
const Hotel = require("../models/Hotel.js");
const { v4: uuid } = require("uuid");

const create = async (data, hotelId, userId) => {
  try {
    // first create new reservation
    const newReservation = new Reservation({
      user: userId,
      hotel: hotelId,
      rooms: data.rooms,
      arrive: data.arrive,
      leave: data.leave,
      guests: data.guests,
      comment: data.comment,
      price: data.price,
      date: Date.now(),
    });

    await newReservation.save();

    // next put reservation id in hotel.reservations

    await Hotel.findByIdAndUpdate(hotelId, {
      $push: { reservations: newReservation._id },
    });

    // next send messages to owner and user
    const hotel = Hotel.find({ _id: hotelId });

    await User.findByIdAndUpdate(userId, {
      $push: {
        messages: {
          msg: `Your reservation for: ${hotel.name} is created successfull.`,
          unread: true,
          id: uuid(),
          time: Date.now(),
        },
      },
    });

    const ownerId = hotel.owner;

    await User.findByIdAndUpdate(ownerId, {
      $push: {
        messages: {
          msg: `Your have new reservation in hotel: ${hotel.name}`,
          unread: true,
          id: uuid(),
          time: Date.now(),
        },
      },
    });

    return newReservation;
  } catch (err) {
    throw err;
  }
};

const remove = async (reservationId) => {
  try {
    const reservation = Reservation.find({ _id: reservationId }).populate();

    const userId = reservation.user._id;
    const ownerId = reservation.hotel.owner;
    const hotelId = reservation.hotel._id;

    // send messages to the user and owner
    await User.findByIdAndUpdate(userId, {
      $push: {
        messages: {
          msg: `Your reservation for: ${hotel.name} was canceld.`,
          unread: true,
          id: uuid(),
          time: Date.now(),
        },
      },
    });

    await User.findByIdAndUpdate(ownerId, {
      $push: {
        messages: {
          msg: `Reservation in hotel: ${hotel.name} was canceld`,
          unread: true,
          id: uuid(),
          time: Date.now(),
        },
      },
    });

    // next remove reservation from hotel.reservations
    await Hotel.findByIdAndUpdate(hotelId, {
      $pull: { reservations: reservationId },
    });

    // finaly remove reservation
    await Reservation.findByIdAndDelete(reservationId);

    return reservation;
  } catch (err) {
    throw err;
  }
};

const getByHotel = async (hotelId) => {
  try {
    const reservations = await Reservation.find({ hotel: hotelId });
    return reservations;
  } catch (err) {
    throw err;
  }
};

const getByUser = async (userId) => {
  try {
    const reservations = await Reservation.find({ user: userId });
    return reservations;
  } catch (err) {
    throw err;
  }
};

const getByOwner = async (ownerId) => {
  const reservations = [];

  try {
    const hotelsList = await Hotel.find({ owner: ownerId }).populate(
      "reservations"
    );

    for (const hotel of hotelsList) {
      for (const item of hotel.reservations) {
        reservations.push(item);
      }
    }

    return reservations;
  } catch (err) {
    throw err;
  }
};

exports.reservationSrv = { create, remove, getByHotel, getByUser, getByOwner };
