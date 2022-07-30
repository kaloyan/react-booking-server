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

const getOne = async (id) => {
  try {
    const response = await Destination.find({ _id: id });
    return response[0];
    //
  } catch (err) {
    throw err;
  }
};

const getFeatured = async () => {
  try {
    const response = await Destination.find({ featured: true });
    return response;
    //
  } catch (err) {
    throw err;
  }
};

const edit = async (id, body) => {
  try {
    await Destination.findByIdAndUpdate(id, { $set:  body  });
    const response = await Destination.find({_id: id});

    return response[0];
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
