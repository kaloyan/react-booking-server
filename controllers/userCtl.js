// Users Controller

const { userSrv } = require("../services/userSrv.js");

const getUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await userSrv.getUser(userId);

    // if not Admin and not account owner = throw error
    if (!req.admin && req.user?.id != user._id) {
      throw {
        status: 403,
        message: "Access denied",
      };
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
};

const getAccount = async (userId) => {
  try {
    const response = await userSrv.getUser(userId);

    return {
      id: response._id,
      username: response.username,
      email: response.email,
      phone: response.phone,
      address: response.address,
      role: response.role,
      avatar: response.avatar,
      messages: response.messages,
      gender: response.gender,
      birthday: response.birthday,
      status: "OK",
    };
  } catch (err) {
    return false;
  }
};

const getUserCounts = async (req, res, next) => {
  const response = await userSrv.getUserCounts(req.params.id);
  res.json(response);
};

const getAll = async (req, res, next) => {
  const users = await userSrv.getAll();
  res.json(users);
};

const updateUser = async (req, res, next) => {
  const userId = req.params.id;
  const data = req.body;

  if (!userId || !data) throw { message: "Server error" };

  try {
    // if not Admin and not account owner = throw error
    if (!req.admin && req.user?.id != userId) {
      throw {
        status: 403,
        message: "Access denied",
      };
    }

    await userSrv.updateUser(userId, data);
    const user = await getAccount(userId);

    res.json(user);
  } catch (err) {
    next(err);
  }
};

const updateMsg = async (req, res, next) => {
  const userId = req.params.id;
  const data = req.body;

  if (!userId || !data) throw { message: "Server error" };

  try {
    // if not Admin and not account owner = throw error
    if (!req.admin && req.user?.id != userId) {
      throw {
        status: 403,
        message: "Access denied",
      };
    }

    await userSrv.updateMsg(userId, data);
    const user = await getAccount(userId);

    res.json(user);
  } catch (err) {
    next(err);
  }
};

const delUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    // if not Admin and not account owner = throw error
    if (!req.admin && req.user?.id != userId) {
      throw {
        status: 403,
        message: "Access denied",
      };
    }

    const result = await userSrv.delUser(userId);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const delMsg = async (req, res, next) => {
  const userId = req.user.id;
  const msgId = req.params.id;

  try {
    await userSrv.delMsg(userId, msgId);

    const user = await getAccount(userId);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.userCtl = {
  getUser,
  getUserCounts,
  getAll,
  updateUser,
  delUser,
  delMsg,
  updateMsg,
};
