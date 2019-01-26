import express from 'express';
import * as controllersFactory from '../controllers/factory';

const router = express.Router();

router.get('/', controllersFactory.homeController().index);

export default router;
