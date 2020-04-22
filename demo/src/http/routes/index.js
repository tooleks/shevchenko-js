const express = require('express');
const serviceFactory = require('../../services/factory');
const homeRouteHandler = require('./home');
const contactMeRouteHandler = require('./contactMe');

const router = express.Router();

router.get('/', homeRouteHandler());
router.post('/contact-me', contactMeRouteHandler(serviceFactory.mailer(), serviceFactory.urlService()));

module.exports = router;
