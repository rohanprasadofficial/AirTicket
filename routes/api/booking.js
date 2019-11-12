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
  res.json({ success: true, message: "Booking Module" });
});

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
    ticket.DestDate = req.body.DestDate;
    ticket.sourceTime = req.body.sourceTime;
    ticket.destTime = req.body.destTime;
    ticket.travelType = req.body.travelType;
    ticket.passengerEmail = req.user.email;
    ticket.passengerName = req.user.name;
    ticket.flightId = req.body.flightId;
    ticket.FlightNumber = req.body.FlightNumber;
    ticket.FlicketName = req.body.FlicketName;

    console.log(ticket.From);
    const TicketSchema = new Ticket(ticket);
    TicketSchema.save()
      .then(ticket => {
        res.json({ status: true, payload: ticket });
      })
      .catch(err => res.json({ status: false, message: err }));
  }
);

router.get(
  "/viewbookings",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Ticket.find({ passengerEmail: req.user.email })
      .then(booking => {
        res.json({ success: true, message: booking });
      })
      .catch(err => res.json({ success: false, message: err }));
  }
);

router.get(
  "/viewallbookings",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.roleID == "2") {
      Ticket.find()
        .then(booking => {
          res.json({ success: true, message: booking });
        })
        .catch(err => res.json({ success: false, message: err }));
    } else {
      res.json({ success: false, message: "Not an admin" });
    }
  }
);

router.post(
  "/deletebooking",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Ticket.findById({ _id: req.body.id })
      .then(booking => {
        if (booking) {
          booking.delete();
          res.json({ success: true, message: "Booking Successfully deleted" });
        } else {
          res.json({ success: false, message: "Booking not found" });
        }
      })
      .catch(err => res.json({ success: false, message: err }));
  }
);

module.exports = router;
