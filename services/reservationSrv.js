const Reservation = require("../models/Reservation.js");
const User = require("../models/User.js");
const Hotel = require("../models/Hotel.js");
const { v4: uuid } = require("uuid");

const create = async (data) => {
  try {
    // first create new reservation
    const newReservation = new Reservation({
      user: data.user,
      hotel: data.hotel,
      rooms: data.rooms.map(Number),
      arrive: data.arrive,
      leave: data.leave,
      comment: data.comment,
      price: data.price,
      date: Date.now(),
    });

    await newReservation.save();

    // next put reservation id in hotel.reservations

    await Hotel.findByIdAndUpdate(data.hotel, {
      $push: { reservations: newReservation._id },
    });

    // next send messages to owner and user
    const hotel = await Hotel.find({ _id: data.hotel });

    await User.findByIdAndUpdate(data.user, {
      $push: {
        messages: {
          msg: `Your reservation for: ${hotel[0].name} is created successfull.`,
          unread: true,
          id: uuid(),
          time: Date.now(),
        },
      },
    });

    const ownerId = hotel[0].owner;

    await User.findByIdAndUpdate(ownerId, {
      $push: {
        messages: {
          msg: `Your have new reservation in hotel: ${hotel[0].name}`,
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
    const reservation = await Reservation.find({ _id: reservationId });

    const item = reservation[0];
    await item.populate("user");
    await item.populate("hotel");

    // send messages to the user and owner
    await User.findByIdAndUpdate(item.user._id, {
      $push: {
        messages: {
          msg: `Your reservation for: ${item.hotel.name} was canceld.`,
          unread: true,
          id: uuid(),
          time: Date.now(),
        },
      },
    });

    await User.findByIdAndUpdate(item.hotel.owner, {
      $push: {
        messages: {
          msg: `Reservation in hotel: ${item.hotel.name} was canceld`,
          unread: true,
          id: uuid(),
          time: Date.now(),
        },
      },
    });

    // next remove reservation from hotel.reservations
    await Hotel.findByIdAndUpdate(item.hotel._id, {
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

const getOne = async (reservationId) => {
  try {
    const reservations = await Reservation.find({ _id: reservationId });

    const item = reservations[0];
    await item.populate("user");
    await item.populate("hotel");

    const answer = {
      _id: item._id,
      date: item.date,
      arrive: item.arrive,
      leave: item.leave,
      rooms: item.rooms,
      price: item.price,
      comment: item.comment,
      hotel: {
        name: item.hotel.name,
        image: item.hotel.pictures[0],
        type: item.hotel.type,
        _id: item.hotel._id,
      },
      guest: {
        name: item.user.username,
        email: item.user.email,
        phone: item.user.phone,
        image: item.user.avatar,
        _id: item.user._id,
      },
    };

    return answer;
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
        const answer = {
          hotel: hotel.name,
          arrive: item.arrive,
          leave: item.leave,
          rooms: item.rooms,
          date: item.date,
          price: item.price,
          _id: item._id,
          comment: item.comment,
        };

        reservations.push(answer);
      }
    }
    return reservations;
  } catch (err) {
    throw err;
  }
};

exports.reservationSrv = {
  create,
  remove,
  getByHotel,
  getByUser,
  getByOwner,
  getOne,
};
