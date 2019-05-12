"use strict";

const express = require("express");
const homeRouter = require("./home");
const contactMeRouter = require("./contactMe");

const router = express.Router();

router.use(homeRouter);
router.use(contactMeRouter);

module.exports = router;
