const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var FlightSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  flightNumber: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Flight = mongoose.model("myFlights", FlightSchema);
