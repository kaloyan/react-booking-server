// Routes guards middlewares

const isUser = (req, res, next) => {
  const isUsr = req.user?.role === "user";

  if (isUsr) {
    req.admin = false;
    res.locals.admin = false;

    return next();
  } else {
    return res.status(403).json({
      status: 403,
      message: "Access denied",
    });
  }
};

const isAdmin = (req, res, next) => {
  const isAdm = req.user?.role === "admin";

  if (isAdm) {
    req.admin = true;
    res.locals.admin = true;

    return next();
  } else {
    return res.status(403).json({
      status: 403,
      message: "Access denied",
    });
  }
};

const isGuest = (req, res, next) => {
  // check if visitor is guest - else return error
  if (req.user == null) {
    return next();
  } else {
    return res.status(403).json({
      status: 403,
      message: "Invalid request",
    });
  }
};

exports.guard = { isUser, isAdmin, isGuest };
