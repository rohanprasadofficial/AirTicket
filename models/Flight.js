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
  flightID: {
    type: String,
    required: true
  },
  Source: {
    type: String,
    required: true
  },
  Destination: {
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

  sourceDate: {
    type: String,
    required: true
  },

  DestDate: {
    type: String,
    required: true
  },

  FclassPrice: {
    type: String,
    required: true
  },

  BclassPrice: {
    type: String,
    required: true
  },

  PclassPrice: {
    type: String,
    required: true
  },

  EclassPrice: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Flight = mongoose.model("myFlights", FlightSchema);
