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
}