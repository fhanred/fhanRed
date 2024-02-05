const express = require("express");
const session = require('express-session');
const morgan = require("morgan");
const routes = require("./routes");
const cors = require("cors");
const {passport, initialize} = require("./passport");
const { JWT_SECRET_KEY } = require("./config/envs");


const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(session({
  secret:`${JWT_SECRET_KEY}`,
  resave: false,
  saveUninitialized: false
}));

app.use(cors());
app.use(morgan("dev"));
app.use("/", routes);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from front
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
app.use(passport.initialize());



app.use("*", (req, res, next) => {
  res.status(404).send({
    error: true,
    message: "Not found",
  });
});

app.use((err, req, res, netx) => {
  res.status(err.statusCode || 500).send({
    error: true,
    message: err.message,
  });
});

module.exports = app;
