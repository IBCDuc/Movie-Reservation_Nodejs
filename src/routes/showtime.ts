import express from "express";
import { HomeController } from "../app/controller/HomeController";
import { UserController } from "../app/controller/UserController";
import { AdminController } from "../app/controller/AdminController";
import { ShowtimeDateController } from "../app/controller/ShowtimeDateController";
import { ShowtimeHoursController } from "../app/controller/ShowtimeHourController";
const router = express.Router();

router.post("/add/date", ShowtimeDateController.addDate)
router.post("/add/hour", ShowtimeHoursController.addHour)

router.get("/date", ShowtimeDateController.getShowtime)
router.get("/hour", ShowtimeHoursController.getShowtime)

export default router;
