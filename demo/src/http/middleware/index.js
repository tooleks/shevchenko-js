"use strict";

const {shareLinksProvider} = require("../../services");

const ErrorHandler = require("./ErrorHandler");
const RedirectToHome = require("./RedirectToHome");
const Utils = require("./Utils");

const errorHandler = new ErrorHandler();
const redirectToHome = new RedirectToHome();
const utils = new Utils(shareLinksProvider);

module.exports = {errorHandler, redirectToHome, utils};
