var express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const passport = require("passport");

/**
 *ROLE ID : 
  Admin - 2
  User - 1 
 */

const app = express();
const port = 8080 || process.env.PORT;

//Passport Middleware
app.use(passport.initialize());
require("./strategy/jsonwtStrategy")(passport);

// app.use(express.static(path.join(__dirname, "public")));
// app.set("view engine", "ejs");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// Importing all the routes/api
const auth = require("./routes/api/auth");
const booking = require("./routes/api/booking");
const flight = require("./routes/api/flight");

app.use("/auth", auth);
app.use("/booking", booking);
app.use("/flight", flight);

var db = require("./setup/DBSetup").DBURL;
const authData = {
  user: "airticketdev",
  pass: "Airticket@24",
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
};

mongoose
  .connect(db, authData)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Connection  Error " + err));

//Basic Checking of Server
app.get("/", (req, res) => {
  res.send("<p>Airticket Server :)</p>");
});

//Starting Server
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
