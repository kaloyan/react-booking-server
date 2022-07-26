// Hotels Controller

const { hotelSrv } = require("../services/hotelSrv.js");

const getOne = async (req, res, next) => {
  const hotelId = req.params.id;

  try {
    const hotel = await hotelSrv.getOne(hotelId);
    res.json(hotel);
  } catch (err) {
    next(err);
  }
};

const getAll = async (req, res, next) => {
  const hotels = await hotelSrv.getAll(req.query, req.query.limit);
  res.json(hotels);
};

const getOwn = async (req, res, next) => {
  const hotels = await hotelSrv.getOwn(req.user.id);
  res.json(hotels);
};

const create = async (req, res, next) => {
  const data = {
    ...req.body,
    owner: req.user.id,
  };

  try {
    const hotel = await hotelSrv.create(data);
    res.json(hotel);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  const hotelId = req.params.id;
  const data = req.body;

  try {
    const hotel = await hotelSrv.update(hotelId, data);
    res.json(hotel);
  } catch (err) {
    next(err);
  }
};

const del = async (req, res, next) => {
  const hotelId = req.params.id;

  try {
    const result = await hotelSrv.del(hotelId);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");

  try {
    const counts = await Promise.all(
      cities.map((city) => hotelSrv.getCount({ city }))
    );

    return res.json({ counts });
  } catch (err) {
    return next(err);
  }
};

const countByType = async (req, res, next) => {
  // const types = ["hotel", "villa", "resort", "apartment", "cabin"];

  try {
    return res.json({
      counts: {
        hotel: await hotelSrv.getCount({ type: "hotel" }),
        villa: await hotelSrv.getCount({ type: "villa" }),
        resort: await hotelSrv.getCount({ type: "resort" }),
        apartment: await hotelSrv.getCount({ type: "apartment" }),
        cabin: await hotelSrv.getCount({ type: "cabin" }),
      },
    });
  } catch (err) {
    return next(err);
  }
};

exports.hotelsCtl = {
  getOne,
  getAll,
  getOwn,
  create,
  update,
  del,
  countByCity,
  countByType,
};
