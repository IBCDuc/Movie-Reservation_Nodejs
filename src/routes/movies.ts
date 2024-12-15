import express from "express";
import { MovieController } from "../app/controller/MovieController";
const router = express.Router();



router.get('/admin', MovieController.getAllMovieSearch)

export default router;
