"use strict";

const {shareLinksProvider, urlService} = require("../../services");

const ErrorHandler = require("./ErrorHandler");
const RedirectToHome = require("./RedirectToHome");
const Utils = require("./Utils");

const errorHandler = new ErrorHandler(urlService);
const redirectToHome = new RedirectToHome(urlService);
const utils = new Utils(urlService, shareLinksProvider);

module.exports = {errorHandler, redirectToHome, utils};
