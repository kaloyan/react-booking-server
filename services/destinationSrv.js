const Destination = require("../models/Destination");

const create = (data) => {
  try {
    const response = new Destination(data);
    return response.save();
  } catch (err) {
    throw err;
  }
};

const getAll = () => {
  try {
    const response = Destination.find({});
    return response;
    //
  } catch (err) {
    throw err;
  }
};

const getOne = (id) => {
  try {
    const response = Destination.find({ _id: id });
    return response;
    //
  } catch (err) {
    throw err;
  }
};

const getFeatured = () => {
  try {
    const response = Destination.find({ featured: true });
    return response;
    //
  } catch (err) {
    throw err;
  }
};

const edit = (id, body) => {
  try {
    const response = Destination.findByIdAndUpdate(id, { $set: { body } });
    return response;
  } catch (err) {
    throw err;
  }
};

const del = (id) => {
  try {
    const response = Destination.findByIdAndDelete(id);
    return response;
  } catch (err) {
    throw err;
  }
};

exports.destinationSrv = { create, getAll, getFeatured, getOne, edit, del };
