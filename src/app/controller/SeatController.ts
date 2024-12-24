import { MovieService } from "../services/MovieService";
import { SeatService } from "../services/SeatService";
import { HomeController } from "./HomeController";
import { Request, Response } from "express";
export class SeatController {
    static async getSeat(req: Request, res: Response ) {
        try {
            const seat = await SeatService.getAllSeat()
            res.json(seat)
        } catch(err) {
            res.status(404).json("something wrong here!!!")
        }
    }
    static async addSeatBasedOnCinemaId(req: Request, res: Response) {
        const {row, numbers, type, cinemaId} = req.body
        console.log(row)
        console.log(numbers)
        console.log(type)
        console.log(cinemaId)
        try {
            for (let i = 1; i <= numbers; i++) {
                const seat = await SeatService.addSeatBasedOnCinemaId(row, i, type, cinemaId)
            } 
            res.json({
                'message': "thanhcong"
            })
        } catch(err) {
            res.status(404).json("something wrong here!!!")
        }
        
    }

    static async updateSeatSlotByShowTime(req: Request, res: Response) {
        const {cinema_id, showtimehour_id} = req.body
        try {
            const data = await SeatService.updateSeatSlotByShowTime(cinema_id, showtimehour_id)
            res.json(data)
        } catch(err) {
            res.status(404).json("something wrong at update seat slot by showtime")
        }
    }
}