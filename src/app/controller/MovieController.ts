import { MovieService } from "../services/MovieService";
import { HomeController } from "./HomeController";
import { Request, Response } from "express";

export class MovieController {
    static async getMovieBaseUrl(req: Request, res: Response ) {
        const id = req.query.search
        console.log(id)
        const movie = await MovieService.getMovieById(id)
        console.log(movie)
        res.json(movie)
    }

    static async getAllMovieSearch(req: Request, res: Response) {
        const queryRT = req.query.search as string
        if (queryRT) {
            const movieRes = await MovieService.getMovieSearch(queryRT)
            res.json(movieRes)
        } else {
            const movieRes = await MovieService.getAllMovie()
            res.json(movieRes)
        }
        
    }
    static async getSingleMovie(req: Request, res: Response) {
        const { id } = req.params
        var ids = Number(id)

        try {
            const movieData = await MovieService.getMovieById(ids)      
            res.json(movieData)
        } catch(err) {
            res.status(404).json({
                message: "connecting error occured",
                err,
            })
        }
    }

    static async getTopMovie(req: Request, res: Response) {
        const topMovie = await MovieService.getTopMovie()
        res.json(topMovie)
    }
    static async getShowtimeApi(req: Request, res: Response) {
        const {id} = req.params
        console.log(id)
        try {
            
            const movie = await MovieService.logicShowTime(id)
            res.json(movie)
        } catch(err) {
            res.status(404).json({
                message: "can get showtime",
                err,
            })
        }

    }
    static async getShowtimeApiCinema(req: Request, res: Response) {
        const { id, cinemaId } = req.params;
        console.log(id, cinemaId);
        try {
            const movie = await MovieService.logicShowTimeCinema(id, cinemaId);
            res.json(movie);
        } catch (err) {
            res.status(404).json({
                message: "can get showtime",
                err,
            });
        }
    }

    static async getTopMoviesByReservations(req: Request, res: Response) {
        try {
            const stats = await MovieService.getTopMoviesByReservations();
            res.status(200).json({
                success: true,
                data: stats
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
}