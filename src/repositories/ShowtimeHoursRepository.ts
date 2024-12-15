import { AppDataSource as dataSource } from "../data-source";
import { ShowtimeDate } from "../entity/Showtime_date";
import { ShowtimeHours } from "../entity/Showtime_hours";

export default class ShowtimeHoursRepository {
    static async getShowTimeDate() {
        const getShowtimeDate = await dataSource
            .getRepository(ShowtimeHours)
            .createQueryBuilder("showtime_hours")
            .innerJoinAndSelect("showtime_hours.showtimeDate", "showtime_date")
            .innerJoinAndSelect("showtime_date.movie", "movie")
            .getMany();
        
        return {
            data: getShowtimeDate,
            total: getShowtimeDate.length,
        };
    }
    static async addHour(showtime_date_id, hour) {
        await dataSource 
            .createQueryBuilder()
            .insert()
            .into(ShowtimeHours)
            .values([
                {
                    showtimeDate: showtime_date_id,
                    Movie_hour: hour
                }
            ])
            .execute()
        return {
            data: "200"
        }
    }
    
}