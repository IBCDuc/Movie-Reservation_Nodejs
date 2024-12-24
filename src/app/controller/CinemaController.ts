
import { Request, Response } from "express";
import { CinemaService } from "../services/CinemaService";


export class CinemaController {

  static async getCinema(req: Request, res: Response) {
    try {
      const resData = await CinemaService.getAllCinema();
      return res.json(resData);
    } catch(err) {
      res.status(404).json("something wrong here!!!")
    }
  }

  static async addCinema(req: Request, res: Response) {
    const {name, status} = req.body
    try {
      const resData = await CinemaService.addCinema(name, status);
      return res.json(resData);
    } catch(err) {
      res.status(404).json("something wrong here!!!")
    }
  }

  static async selectCinema(req: Request, res: Response) {
    const {cinemaId, movieId} = req.query
    try {
      const resData = await CinemaService.addCinema(name, status);
      return res.json(resData);
    } catch(err) {
      res.status(404).json("something wrong here!!!")
    }
  }
}
