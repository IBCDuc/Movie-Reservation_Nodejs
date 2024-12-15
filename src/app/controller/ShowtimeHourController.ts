
import { Request, Response } from "express";
import { ShowtimeHoursService } from "../services/ShowtimeHourService";

export class ShowtimeHoursController {
  static async getShowtime(req: Request, res: Response) {
        try {
            const showTimeHours = await ShowtimeHoursService.getShowTimeDate()
            res.json(showTimeHours);
        } catch(err) {
            res.status(404).json("something wrong here showtimehours!!!")
        }
    }
    static async addHour(req: Request, res: Response) {
        const {showtime_date_id, hour} = req.body
        try {
            const resHour = await ShowtimeHoursService.addHour(showtime_date_id, hour)
            res.json(resHour)
        } catch(err) {
            res.status(404).json("something wrong here hours!")
        }
    }
}
