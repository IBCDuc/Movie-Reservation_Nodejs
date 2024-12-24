import express from "express";
import { HomeController } from "../app/controller/HomeController";
import { UserController } from "../app/controller/UserController";
import { AdminController } from "../app/controller/AdminController";
const router = express.Router();


router.post("/login", UserController.login)

export default router;
