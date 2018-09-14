import express from "express";
import homeRouter from "./home";
import contactMeRouter from "./contactMe";

const router = express.Router();

router.use(homeRouter);
router.use(contactMeRouter);

export default router;
