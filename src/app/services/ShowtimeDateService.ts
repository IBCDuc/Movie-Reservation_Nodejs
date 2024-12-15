
import AdminRepository from "../../repositories/AdminRepository";
import ShowtimeDateRepository from "../../repositories/ShowtimeDateRepository";


export class ShowtimeDateService {

    //ADMIN
    static async getShowTimeDate() {
        return await ShowtimeDateRepository.getShowTimeDate()
    }

    static async addShowtimeDate(movie_id, date, status) {
        const insertedData = await ShowtimeDateRepository.addShowtimeDate(movie_id, date, status)
        return insertedData
    }

}