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
  returnDate: {
    type: String,
    required: true
  },
  passengerType: {
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
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Admin = mongoose.model("myAdmin", AdminSchema);
