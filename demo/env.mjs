import path from 'path';
import dotenv from 'dotenv';
import {basePath} from './paths';

// Load environment variables from .env file into a process.env variable.
dotenv.config({path: path.join(basePath, '.env')});
