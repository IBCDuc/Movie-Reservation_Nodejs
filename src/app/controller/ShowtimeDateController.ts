
import { Request, Response } from "express";
import { AdminService } from "../services/AdminService";
import { ShowtimeDateService } from "../services/ShowtimeDateService";

export class ShowtimeDateController {
  static async getShowtime(req: Request, res: Response) {
        try {
        const showTimeDate = await ShowtimeDateService.getShowTimeDate()
        res.json(showTimeDate);
        } catch(err) {
        res.status(404).json("something wrong here showtimedate!!!")
        }
    }
    static async addDate(req: Request, res: Response) {
      const { movie_id, date, status } = req.body
      
      try {
        const insertedData = await ShowtimeDateService.addShowtimeDate(movie_id, date, status)
        res.json(insertedData)
      } catch(err) {
        res.status(404).json("Something wrong showtimedate")
      }
    }
}
