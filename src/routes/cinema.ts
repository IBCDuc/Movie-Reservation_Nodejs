import express from "express";
import { HomeController } from "../app/controller/HomeController";
import { UserController } from "../app/controller/UserController";
import { AdminController } from "../app/controller/AdminController";
import { CinemaController } from "../app/controller/CinemaController";
const router = express.Router();

router.post("/add", CinemaController.addCinema.bind(CinemaController))
router.get("/", CinemaController.getCinema.bind(CinemaController))


export default router;
