const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var AdminSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profilepic: {
    type: String,
    default:
      "https://edlife.edu.mv/wp-content/uploads/2017/05/20161014_58006bfd76dcf.png"
  },
  date: {
    type: Date,
    default: Date.now
  },
  roleID: {
    type: String,
    required: true,
    default: 2
  }
});

module.exports = Admin = mongoose.model("myAdmin", AdminSchema);
