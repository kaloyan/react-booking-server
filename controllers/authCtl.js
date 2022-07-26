// Auth Controller

const { authSrv } = require("../services/authSrv.js");
const { userSrv } = require("../services/userSrv.js");

const getAccount = async (userId, message) => {
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
      message,
      status: "OK",
    };
  } catch (err) {
    return false;
  }
};

const login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    //!TODO - validate input

    const user = await authSrv.login(email, password);
    const token = authSrv.genToken(user);
    const answer = await getAccount(user._id, "Login successfull");

    res.cookie("jwt_token", token, { httpOnly: true }).json(answer);
  } catch (err) {
    next(err);
  }
};

const register = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const rePass = req.body.rePass;
  let role = req.body.role;

  // validate role
  if (role !== "user" && role !== "owner") {
    role = "user";
  }

  try {
    //!TODO - validate inputs
    if (password !== rePass) {
      throw { status: 500, message: "Passwords don't match" };
    }

    const user = await authSrv.register(username, email, password, role);
    const token = authSrv.genToken(user);
    const answer = await getAccount(user._id, "Registratoin successfull");

    res.cookie("jwt_token", token, { httpOnly: true }).status(201).json(answer);
  } catch (err) {
    next(err);
  }
};

const logout = (req, res) => {
  res.clearCookie("jwt_token").json({
    message: "Logout successfull",
  });
};

const account = async (req, res, next) => {
  if (req.user) {
    // get users data
    const answer = await getAccount(req.user.id, "Account is valid");

    if (answer) {
      res.json(answer);
    } else {
      res.status(400).json({ error: "Invalid account" });
    }
  } else {
    res.status(203).send([]);
  }
};

exports.authCtl = { login, register, logout, account };
