import express from "express";
import { HomeController } from "../app/controller/HomeController";
import { UserController } from "../app/controller/UserController";
const router = express.Router();



router.get("/get-user", UserController.getUser);



export default router;
