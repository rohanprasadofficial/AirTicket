const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var RouteSchema = new Schema({
  startDest: {
    type: String,
    required: true
  },
  finishDest: {
    type: String,
    required: true
  },

  startDestCode: {
    type: String,
    required: true
  },
  finishDestCode: {
    type: String,
    required: true
  },
  routeID: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Route = mongoose.model("myRoutes", RouteSchema);
