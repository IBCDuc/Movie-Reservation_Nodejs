import express from "express";
import { HomeController } from "../app/controller/HomeController";
import { UserController } from "../app/controller/UserController";
import { AdminController } from "../app/controller/AdminController";
const router = express.Router();


router.get("/get-admin", AdminController.getAdmin.bind(AdminController))
router.post("/add-user", UserController.addUser);
router.post("/update-user", UserController.updateUser)
router.delete("/delete-user", UserController.deleteUser)

export default router;
