"use strict";

const path = require("path");
const dotenv = require("dotenv");

// Load environment variables from .env file into a process.env variable.
dotenv.config({ path: path.join(__dirname, ".env") });
