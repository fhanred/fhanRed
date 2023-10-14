const express = require("express");
const morgan = require("morgan");
const routes = require("./routes");
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true  }))
app.use(morgan("dev"));
app.use("/", routes);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from 'https://pokedex-app-wine.vercel.app' 
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
/* 
app.use("*", (req, res)=> {
    res.status(404).send("Not found");
}); */

app.use((err, req, res, netx) => {
  res.status(err.statusCode || 500).send({
    error: true,
    message: err.message,
  });
});

module.exports = app;
