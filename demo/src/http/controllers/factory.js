"use strict";

const servicesFactory = require("../../services/factory");
const ContactMeController = require("./ContactMeController");
const HomeController = require("./HomeController");

/** @returns {ContactMeController} */
function contactMeControllerFactory() {
  return new ContactMeController(servicesFactory.mailer(), servicesFactory.urlService());
}

/** @returns {HomeController} */
function homeControllerFactory() {
  return new HomeController();
}

module.exports = {
  contactMeController: contactMeControllerFactory,
  homeController: homeControllerFactory,
};
