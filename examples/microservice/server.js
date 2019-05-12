"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const shevchenko = require("shevchenko");
const pkg = require("./package.json");

process.env.PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());

app.post("/", (req, res) => {
  setImmediate(() => {
    try {
      const anthroponym = shevchenko(req.body.anthroponym, req.body.caseName);
      res.json(anthroponym);
    } catch (error) {
      res.status(422).send(error.message);
    }
  });
});

app.listen(process.env.PORT, () => {
  console.log(`${pkg.name} is listening on ${process.env.PORT} port.`);
});
