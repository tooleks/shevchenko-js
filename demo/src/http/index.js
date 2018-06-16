"use strict";

const {mailer} = require("../services");

const ContactMeController = require("./ContactMeController");
const HomeController = require("./HomeController");

const contactMeController = new ContactMeController(mailer);
const homeController = new HomeController();

module.exports = {contactMeController, homeController};
