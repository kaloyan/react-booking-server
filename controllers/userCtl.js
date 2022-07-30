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

  try {
    // if not Admin and not account owner = throw error
    if (!req.admin && req.user?.id != userId) {
      throw {
        status: 403,
        message: "Access denied",
      };
    }

    //!TODO prevent role escalation

    const user = await userSrv.updateUser(userId, data);

    res.json({
      status: "OK",
      message: `User ${user.username} updated successfull`,
    });
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
    res.json({
      status: "OK",
      message: `User ${result.username} deleted successfull`,
    });
  } catch (err) {
    next(err);
  }
};

const delMsg = async (req, res, next) => {
	const userId = req.user.id;
	const msgId = req.params.id;
	
	try {
		const response = await userSrv.delMsg(userId, msgId);
		res.json(response);
	} catch (err) {
		next(err);
	}
}

const readMsg = async (req, res, next) => {
	const userId = req.user.id;
	const msgId = req.params.id;
	
	try {
		const response = await userSrv.readMsg(userId, msgId);
		res.json(response);
	} catch (err) {
		next(err);
	}
}

exports.userCtl = { getUser, getUserCounts, getAll, updateUser, delUser, delMsg, readMsg };

