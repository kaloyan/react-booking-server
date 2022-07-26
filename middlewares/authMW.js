// Authentication middleware

const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  const tokenCookie = req.cookies.jwt_token;

  if (!tokenCookie) {
    req.user = null;
    req.admin = false;
    res.locals.user = null;

    return next();
  }

  jwt.verify(tokenCookie, process.env.JWT_KEY, (err, user) => {
    if (err) {
      // the token is invalid so remove the cookie
      res.clearCookie("jwt_token");

      req.user = null;
      req.admin = false;
      res.locals.user = null;

      return next();
    }

    req.user = user;
    res.locals.user = user;

    if (user.role === "admin") {
      req.admin = true;
    } else {
      req.admin = false;
    }

    next();
  });
};

module.exports = { isAuth };
