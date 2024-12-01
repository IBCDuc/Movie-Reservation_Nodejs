import { Request, Response } from "express";
import { HomeModel } from "../../models/HomeModel";
import UsersRepository from "../../repositories/UsersRepository";
import { MovieService } from "../services/MovieService";

export class HomeController {
  static async home(req: Request, res: Response) {
    try {
      res.json([{
        name: 'duck',
        status: 'code',
        mood: 'motivate',
        date: new Date()
      }])
    } catch(err) {
      res.status(400).json({
        message: "connecting error occured",
        err,
      });
    }
  }
  static async pageProducts(req: Request, res: Response) {
    try {
      console.log(req.body)
      const {name , email, password} = req.body
      
      const info = {name, email, password}
      const user = await UsersRepository.addUser(info)
      console.log(user)

    } catch(err) {
      console.log(err);
    }
  }

  static async getAllMovie(req: Request, res: Response) {
    try {
      const movieData = await MovieService.getAllMovie()
      res.json(movieData)
    } catch(err) {
      res.status(404).json({
        message: "connecting error occured",
        err,
      })
    }
  }
}


