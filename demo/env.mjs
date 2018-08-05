import path from "path";
import dotenv from "dotenv";

// Load environment variables from .env file into a process.env variable.
dotenv.config({path: path.resolve(".env")});
