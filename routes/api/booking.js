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

const Ticket = require("./../../models/Ticket");

router.get("/", (req, res) => {
  res.json({ sucess: true, message: "Booking Module" });
});
const Flight = require("./../../models/Flight");
router.post(
  "/bookticket",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // // res.json(req.user);
    // console.log(req.user);
    const ticket = {};
    ticket.From = req.body.From;
    ticket.To = req.body.To;
    ticket.DepartDate = req.body.DepartDate;
    ticket.returnDate = req.body.returnDate;
    ticket.passengerType = req.body.passengerType;
    ticket.travelType = req.body.travelType;
    ticket.passengerEmail = req.user.email;
    ticket.passengerName = req.user.name;
    console.log(ticket.From);
    const TicketSchema = new Ticket(ticket);

    TicketSchema.save()
      .then(ticket => {
        res.json({ status: true, payload: ticket });
      })
      .catch(err => res.json({ status: false, message: err }));
  }
);

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

module.exports = router;
