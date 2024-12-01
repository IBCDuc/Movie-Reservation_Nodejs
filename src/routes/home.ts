import express from "express";

import { HomeController } from "../app/controller/HomeController";

const router = express.Router();



router.get("/fake-api", HomeController.home);
router.get("/haha", HomeController.pageProducts)
router.get("/api/movies", HomeController.getAllMovie )

export default router;
