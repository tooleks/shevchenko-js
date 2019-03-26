'use strict';

const express = require('express');
const controllersFactory = require('../controllers/factory');

const router = express.Router();

router.post('/contact-me', controllersFactory.contactMeController().send);

module.exports = router;
