const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const usersRoute = require("./routes/users");

const port = process.env.PORT || config.app.port;
const prefix = config.api.prefix;
const db = config.database.url;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Accept, Authorization"
  );
  next();
});

app.use(prefix, registerRoute);
app.use(prefix, loginRoute);
app.use(prefix, usersRoute);

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connected to mongoDB", db))
  .catch(err => console.log("Error", err));

app.listen(port, () => {
  console.log("listening on port", port);
});
