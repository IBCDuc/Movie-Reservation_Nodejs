
import AdminRepository from "../../repositories/AdminRepository";
import ShowtimeDateRepository from "../../repositories/ShowtimeDateRepository";
import ShowtimeHoursRepository from "../../repositories/ShowtimeHoursRepository";


export class ShowtimeHoursService {

    //ADMIN
    static async getShowTimeDate() {
        return await ShowtimeHoursRepository.getShowTimeDate()
    }

    static async addHour(showtime_date_id, hour) {
        return ShowtimeHoursRepository.addHour(showtime_date_id, hour)
    }

}