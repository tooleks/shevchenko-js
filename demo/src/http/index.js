"use strict";

const {mailer, urlService} = require("../services");

const ContactMeController = require("./ContactMeController");
const HomeController = require("./HomeController");

const contactMeController = new ContactMeController(mailer, urlService);
const homeController = new HomeController();

module.exports = {contactMeController, homeController};
