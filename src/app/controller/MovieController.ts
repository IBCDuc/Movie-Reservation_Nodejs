import { MovieService } from "../services/MovieService";
import { HomeController } from "./HomeController";
import { Request, Response } from "express";
export class MovieController {
    static async getMovieBaseUrl(req: Request, res: Response ) {
        const id = req.params.id
        const movie = await MovieService.getMovieById(id)
        console.log(movie)
        res.json(movie)
        
    }
}