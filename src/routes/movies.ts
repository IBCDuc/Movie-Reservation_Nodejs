import express from "express";
import { MovieController } from "../app/controller/MovieController";
import { Movie } from "../entity/Movie";
const router = express.Router();


router.get('/top', MovieController.getTopMovie)
router.get('/admin', MovieController.getAllMovieSearch)
router.get('/single-movie/:id', MovieController.getSingleMovie)
router.get('/showtime/:id', MovieController.getShowtimeApi)
router.get('/showtime/:id/:cinemaId', MovieController.getShowtimeApiCinema);
router.get('/stats/top-movies', MovieController.getTopMoviesByReservations);

export default router;
