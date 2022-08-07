// Review service

const Review = require("../models/Review.js");
const Reservation = require("../models/Reservation.js");
const Hotel = require("../models/Hotel.js");

const getByHotel = async (hotelId) => {
  if (!hotelId) throw { error: "Hotel ID is required" };

  try {
    const reviews = await Review.find({ hotel: hotelId })
      .sort({ date: -1 })
      .limit(5);

    return reviews;
  } catch (err) {
    throw err;
  }
};

const getByUser = (userId) => {
  if (!userId) throw { error: "User ID is required" };

  try {
    const reviews = Review.find({ user: userId });

    return reviews;
  } catch (err) {
    throw err;
  }
};

const remove = async (reviewId, userId) => {
  if (!reviewId) throw { error: "Review ID is required" };

  try {
    await Review.findByIdAndDelete({ reviewId });
    const reviews = Review.find({ user: userId });
    return reviews;
  } catch (err) {
    throw err;
  }
};

const create = async (hotelId, userId, data) => {
  if (!hotelId || !userId || !data) throw { error: "Invalid input" };

  try {
    // check if user alreadt submited review for this hotel
    const items = await Review.find({ user: userId });

    for (const item of items) {
      if (item.hotel == hotelId) {
        throw { error: "You already submitted review for this hotel" };
      }
    }

    // check if user have made reservations in this hotel
    const reservations = await Reservation.find({ user: userId });
    const check = reservations.some((x) => x.hotel == hotelId);

    if (!check) {
      throw { error: "You didn't made any reservations in this hotel" };
    }

    // create new review
    const review = new Review(data);
    await review.save();

    // update rating of the hotel
    const hotel = await Hotel.findById(hotelId);

    let rating;
    if (data.rating > 5) data.rating = 5;
    if (data.rating < 1) data.rating = 1;

    if (hotel.rating == 0) {
      rating = Number(data.rating);
    } else {
      rating = (Number(data.rating) + hotel.rating) / 2;
    }

    rating = Math.round(rating * 10) / 10;

    await Hotel.findByIdAndUpdate(hotelId, { rating: rating });

    // return list of last 5 review for this hotel
    const reviews = await Review.find({ hotel: hotelId })
      .sort({ date: -1 })
      .limit(5);

    return reviews;
  } catch (err) {
    throw err;
  }
};

const update = (reviewId) => {
  //todo
};

const canPost = async (userId, hotelId) => {
  try {
    // check if user alreadt submited review for this hotel
    const items = await Review.find({ user: userId });

    for (const item of items) {
      if (item.hotel == hotelId) {
        return false;
      }
    }

    // check if user have made reservations in this hotel
    const reservations = await Reservation.find({ user: userId });
    const check = reservations.some((x) => x.hotel == hotelId);

    if (!check) {
      return false;
    }

    return true;
  } catch (err) {
    throw err;
  }
};

exports.reviewSrv = { getByHotel, getByUser, remove, create, update, canPost };
