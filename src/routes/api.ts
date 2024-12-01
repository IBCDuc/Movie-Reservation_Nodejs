import express from "express";
import { HomeController } from "../app/controller/HomeController";
import { UserController } from "../app/controller/UserController";
import { MovieController } from "../app/controller/MovieController";
const router = express.Router();



router.get("/get-user", UserController.getUser);
router.get("/single-movie/:id", MovieController.getMovieBaseUrl)


export default router;
