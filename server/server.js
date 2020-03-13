const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const Rental = require("./db/Rental.js");

mongoose.connect("mongodb://localhost:27017/airbnb", { useNewUrlParser: true, useUnifiedTopology: true });

var app = express();

app.use(express.static(path.resolve(__dirname, "../public")));

app.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
  Rental.findOne({ _id: id })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

app.listen(3003, err => {
  console.log("Listening on port 3003...");
});