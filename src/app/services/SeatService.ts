import { Movie } from "../../entity/Movie";
import MovieRepository from "../../repositories/MovieRepository";
import SeatRepository from "../../repositories/SeatRepository";

export class SeatService {
    static async getAllSeat() {
        const seat  = await SeatRepository.getSeat()
        return seat
    }
    static async addSeatBasedOnCinemaId(row, number, type, cinemaId) {
        const res = SeatRepository.addSeatBasedOnMovie(row, number, type,cinemaId)
        return res
    }
    static async updateSeatSlotByShowTime(cinemaId, showtime_hours_id) {
        const res = SeatRepository.updateSeatSlotShowtime(cinemaId, showtime_hours_id)
        return res
    }

}