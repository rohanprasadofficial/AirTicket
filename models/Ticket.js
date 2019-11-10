const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var TicketSchema = new Schema({
  From: {
    type: String,
    required: true
  },
  To: {
    type: String,
    required: true
  },
  DepartDate: {
    type: String,
    required: true
  },
  DestDate: {
    type: String,
    required: true
  },
  sourceTime: {
    type: String,
    required: true
  },

  destTime: {
    type: String,
    required: true
  },
  travelType: {
    type: String,
    required: true
  },

  passengerEmail: {
    type: String,
    required: true
  },
  passengerName: {
    type: String,
    required: true
  },
  flightId: {
    type: String,
    required: true
  },
  FlicketName: {
    type: String,
    required: true
  },

  FlightNumber: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Ticket = mongoose.model("myTickets", TicketSchema);
