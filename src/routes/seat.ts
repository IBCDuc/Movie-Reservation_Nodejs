import express from "express";
import { HomeController } from "../app/controller/HomeController";
import { UserController } from "../app/controller/UserController";
import { AdminController } from "../app/controller/AdminController";
import { CinemaController } from "../app/controller/CinemaController";
import { SeatController } from "../app/controller/SeatController";
const router = express.Router();

router.post("/showtime/update", SeatController.updateSeatSlotByShowTime)
router.post("/save", SeatController.addSeatBasedOnCinemaId)
router.get("/", SeatController.getSeat)

export default router;
