const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var AirportSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Airport = mongoose.model("myAirport", AirportSchema);
