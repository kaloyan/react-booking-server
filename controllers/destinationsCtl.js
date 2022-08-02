// Destinations controllers

const { destinationSrv } = require("../services/destinationSrv");

const create = async (req, res, next) => {
  try {
    const data = {
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      featured: req.body.featured === "true",
    };

    const response = await destinationSrv.create(data);

    res.json(response);
    // console.log(data);
  } catch (err) {
    next(err);
  }
};

const getAll = async (req, res, nest) => {
  try {
    const response = await destinationSrv.getAll();
    res.json(response);
  } catch (err) {
    next(err);
  }
};

const getFeatured = async (req, res, nest) => {
  try {
    const response = await destinationSrv.getFeatured();
    res.json(response);
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const response = await destinationSrv.getOne(req.params.id);
    res.json(response);
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const response = await destinationSrv.edit(id, body);
    res.json(response);
  } catch (err) {
    next(err);
  }
};

const del = async (req, res, next) => {
  try {
    const id = req.params.id;

    const response = await destinationSrv.del(id);
    res.json(response);
  } catch (err) {
    next(err);
  }
};

exports.destCtl = { create, getAll, getOne, getFeatured, edit, del };
