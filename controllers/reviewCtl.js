// Reviews controller

const { reviewSrv } = require("../services/reviewSrv.js");

const getByHotel = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) throw { error: "You must provide hotel ID" };

    const reviews = await reviewSrv.getByHotel(id);
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};

const getByUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) throw { error: "You must provide hotel ID" };

    const reviews = await reviewSrv.getByUser(id);
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  const hotelId = req.params?.id;
  const userId = req.user?.id;
  const data = req.body;

  try {
    if (!hotelId || !userId || !data) {
      throw { error: "Invalid input" };
    }

    data.user = userId;
    data.hotel = hotelId;

    const response = await reviewSrv.create(hotelId, userId, data);

    res.json(response);
  } catch (err) {
    next(err);
  }
};

const update = (req, res, next) => {
  //todo
};

const canPost = async (req, res, next) => {
  const hotelId = req.params?.id;
  const userId = req.user?.id;

  if (!hotelId || !userId) {
    res.send(false);
  }

  const response = await reviewSrv.canPost(userId, hotelId);

  res.send(response);
};

const remove = async (req, res, next) => {
  //todo
};

exports.reviewCtl = { getByHotel, getByUser, create, remove, update, canPost };
