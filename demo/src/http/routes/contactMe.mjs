import express from "express";
import * as controllersFactory from "../controllers/factory";

const router = express.Router();

router.post("/contact-me", controllersFactory.contactMeController().send);

export default router;
