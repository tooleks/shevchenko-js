'use strict';

const express = require('express');
const controllersFactory = require('../controllers/factory');

const router = express.Router();

router.get('/', controllersFactory.homeController().index);

module.exports = router;
