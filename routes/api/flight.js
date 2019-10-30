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

router.get("/", (req, res) => {
  res.json({ sucess: true, message: "Flight Module" });
});

router.post(
  "/addflight",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // // res.json(req.user);
    // console.log(req.user);

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

module.exports = router;
