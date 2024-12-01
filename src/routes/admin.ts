import express from "express";
import { HomeController } from "../app/controller/HomeController";
import { UserController } from "../app/controller/UserController";
const router = express.Router();



router.post("/add-user", UserController.addUser);
router.post("update-user", UserController.updateUser)


export default router;
