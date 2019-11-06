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

const Airport = require("./../../models/Airport");
router.get("/", (req, res) => {
  res.json({ success: true, message: "Flight Module" });
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
      flight.flightID = req.body.flightID;

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

router.get(
  "/getallflights",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // // res.json(req.user);
    console.log(req.user.roleID);

    Flight.find()
      .then(flight => {
        if (flight) {
          res.json({ status: true, message: flight });
        } else {
          res.json({ status: false, message: "Flight not found" });
        }
      })
      .catch(err => res.json({ status: false, message: err }));
  }
);

router.delete(
  "/deleteflight",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // // res.json(req.user);
    console.log(req.user.roleID);
    if (req.user.roleID == "2") {
      Flight.findOne({
        name: req.body.name,
        flightNumber: req.body.flightNumber,
        flightID: req.body.flightID
      })
        .then(flight => {
          if (flight) {
            flight.delete();
            res.json({ status: true, message: flight });
          } else {
            res.json({ status: false, message: "Flight not found" });
          }
        })
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
      route.routeID = req.body.routeID;

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

router.get(
  "/getallroutes",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // // res.json(req.user);
    console.log(req.user.roleID);
    if (req.user.roleID == "2") {
      Route.find()
        .then(route => {
          if (route) {
            res.json({ status: true, message: route });
          } else {
            res.json({ status: false, message: "Route not found" });
          }
        })
        .catch(err => res.json({ status: false, message: err }));
    } else {
      res.json({ status: false, message: "Not an admin" });
    }
  }
);

router.delete(
  "/deleteroute",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // // res.json(req.user);
    console.log(req.user.roleID);
    if (req.user.roleID == "2") {
      Route.findOne({
        startDest: req.body.startDest,
        finishDest: req.body.finishDest,
        startDestCode: req.body.startDestCode,
        finishDestCode: req.body.finishDestCode,
        routeID: req.body.routeID
      })
        .then(route => {
          if (route) {
            route.delete();
            res.json({ status: true, message: route });
          } else {
            res.json({ status: false, message: "Route not found" });
          }
        })
        .catch(err => res.json({ status: false, message: err }));
    } else {
      res.json({ status: false, message: "Not an admin" });
    }
  }
);

router.post(
  "/addairport",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // // res.json(req.user);
    console.log(req.user.roleID);
    if (req.user.roleID == "2") {
      const airport = {};
      airport.name = req.body.name;

      var flightSchema = new Airport(airport);
      Airport.findOne({ name: req.body.name })
        .then(airport => {
          if (airport) {
            res.json({ status: false, message: "Aiport already exist" });
          } else {
            flightSchema
              .save()
              .then(airport =>
                res.json({
                  status: true,
                  message: "Successfully added airport"
                })
              )
              .catch(err => res.json({ status: false, message: err }));
          }
        })
        .catch(err => res.json({ status: false, message: err }));
    } else {
      res.json({ status: false, message: "Not an admin" });
    }
  }
);

router.get(
  "/getallairports",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // // res.json(req.user);
    console.log(req.user.roleID);

    Airport.find()
      .then(flight => {
        if (flight) {
          res.json({ status: true, message: flight });
        } else {
          res.json({ status: false, message: "Flight not found" });
        }
      })
      .catch(err => res.json({ status: false, message: err }));
  }
);

router.delete(
  "/deleteairport",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // // res.json(req.user);
    console.log(req.user.roleID);
    if (req.user.roleID == "2") {
      Airport.findOne({
        name: req.body.name
      })
        .then(flight => {
          if (flight) {
            flight.delete();
            res.json({ status: true, message: "Successfully deleted airport" });
          } else {
            res.json({ status: false, message: "Airport not found" });
          }
        })
        .catch(err => res.json({ status: false, message: err }));
    } else {
      res.json({ status: false, message: "Not an admin" });
    }
  }
);

module.exports = router;
