'use strict';

const path = require('path');
const dotenv = require('dotenv');
const { basePath } = require('./paths');

// Load environment variables from .env file into a process.env variable.
dotenv.config({ path: path.join(basePath, '.env') });
