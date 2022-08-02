const route = require("express").Router();

// import controllers
const { authCtl } = require("./controllers/authCtl.js");
const { hotelsCtl } = require("./controllers/hotelsCtl.js");
const { userCtl } = require("./controllers/userCtl.js");
const { roomCtl } = require("./controllers/roomCtl.js");
const { destCtl } = require("./controllers/destinationsCtl");
const { reservateCtl } = require("./controllers/reservationCtl");

// import middlewares
const { err } = require("./middlewares/errorHandlerMW.js");
const { isAuth } = require("./middlewares/authMW.js");
const { guard } = require("./middlewares/guardsMW.js");

route.use(isAuth);

// define all paths

// authentication routes
route.post("/auth/login", guard.isGuest, authCtl.login, err);
route.post("/auth/register", guard.isGuest, authCtl.register, err);
route.get("/auth/logout", authCtl.logout, err);
route.get("/auth/account", authCtl.account, err);

// hotels API routes
route.get("/api/v1/hotels", hotelsCtl.getAll, err);
route.get("/api/v1/hotels/query*", hotelsCtl.query, err);
route.get("/api/v1/hotels/own", hotelsCtl.getOwn, err);
route.get("/api/v1/hotels/countByCity", hotelsCtl.countByCity, err);
route.get("/api/v1/hotels/countByType", hotelsCtl.countByType, err);
route.get("/api/v1/hotels/:id", hotelsCtl.getOne, err);
route.post("/api/v1/hotels", hotelsCtl.create, err);
route.put("/api/v1/hotels/:id", hotelsCtl.update, err);
route.delete("/api/v1/hotels/:id", hotelsCtl.del, err);

// rooms API routes
route.get("/api/v1/rooms", roomCtl.getAll, err);
route.get("/api/v1/rooms/:id", roomCtl.getOne, err);
route.post("/api/v1/rooms/:hotelId", roomCtl.create, err);
route.put("/api/v1/rooms/:id", roomCtl.update, err);
route.delete("/api/v1/rooms/:id", roomCtl.del, err);

// users API routes
route.get("/api/v1/users", guard.isAdmin, userCtl.getAll, err);
route.get("/api/v1/users/:id", userCtl.getUser, err);
route.get("/api/v1/users/:id/counts", userCtl.getUserCounts, err);
route.get("/api/v1/users/msg/:id", userCtl.readMsg, err);
route.put("/api/v1/users/:id", userCtl.updateUser, err);
route.delete("/api/v1/users/:id", userCtl.delUser, err);
route.delete("/api/v1/users/msg/:id", userCtl.delMsg, err);

// destinations API routes
route.post("/api/v1/destinations", guard.isAdmin, destCtl.create, err);
route.get("/api/v1/destinations", destCtl.getAll, err);
route.get("/api/v1/destinations/:id", destCtl.getOne, err);
route.put("/api/v1/destinations/edit/:id", guard.isAdmin, destCtl.edit, err);
route.delete("/api/v1/destinations/del/:id", guard.isAdmin, destCtl.del, err);

// reservations API routes
route.get("/api/v1/reservate/hotel/:hotelId", reservateCtl.getByHotel, err);
route.get("/api/v1/reservate/user/:userId", reservateCtl.getByUser, err);
route.get("/api/v1/reservate/owner/:ownerId", reservateCtl.getByOwner, err);
route.get("/api/v1/reservate/:reservationId", reservateCtl.getOne, err);
route.post("/api/v1/reservate/", reservateCtl.create, err);
route.delete("/api/v1/reservate/:reservationId", reservateCtl.remove, err);

// define 404 not found route
route.get("*", (req, res) => {
  res.status(404).json({ status: 404, message: "Not found" });
});

module.exports = route;

