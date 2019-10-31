const express = require("express");
const router = express.Router();
const bodyparser = require("body-parser");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const passportjwt = require("passport-jwt");
const jwt = require("jsonwebtoken");
const key = require("../../setup/DBSetup").secret;

router.use(bodyparser.urlencoded({ extended: false }));
router.use(bodyparser.json());

const Flight = require("./../../models/Flight");
const Route = require("./../../models/Route");
router.get("/", (req, res) => {
  res.json({ sucess: true, message: "Flight Module" });
});

router.post(
  "/addflight",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // // res.json(req.user);
    console.log(req.user.roleID);
    if (req.user.roleID == "2") {
      const flight = {};
      flight.name = req.body.name;
      flight.flightNumber = req.body.flightNumber;
      var flightSchema = new Flight(flight);
      flightSchema
        .save()
        .then(flight => res.json({ status: true, payload: flight }))
        .catch(err => res.json({ status: false, message: err }));
    } else {
      res.json({ status: false, message: "Not an admin" });
    }
  }
);

router.post(
  "/addroute",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // // res.json(req.user);
    console.log(req.user.roleID);
    if (req.user.roleID == "2") {
      const route = {};
      route.startDest = req.body.startDest;
      route.finishDest = req.body.finishDest;
      route.startDestCode = req.body.startDestCode;
      route.finishDestCode = req.body.finishDestCode;
      var routeSchema = new Route(route);
      routeSchema
        .save()
        .then(route => res.json({ status: true, payload: route }))
        .catch(err => res.json({ status: false, message: err }));
    } else {
      res.json({ status: false, message: "Not an admin" });
    }
  }
);

module.exports = router;
