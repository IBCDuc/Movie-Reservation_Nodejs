import { AppDataSource as dataSource } from "../data-source";
import { SeatSlot } from "../entity/Seat_slot";
import { ShowtimeDate } from "../entity/Showtime_date";
import { ShowtimeHours } from "../entity/Showtime_hours";
import { Not, IsNull } from "typeorm";


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
    static async addHour(showtime_date_id, hour, cinema_id) {
        // Check if showtime already exists
        const result = await dataSource
            .createQueryBuilder()
            .insert()
            .into(ShowtimeHours)
            .values([
                {
                    showtimeDate: showtime_date_id,
                    Movie_hour: hour,
                },
            ])
            .returning(["Showtime_hours_id"])
            .execute();
    
        const showtimeId = result.generatedMaps[0].Showtime_hours_id;
    
        // Get existing seats
        const seatSlots = await dataSource
            .getRepository(SeatSlot)
            .find({ where: { cinemaRoom: { cinema_id } ,
                showtimeHours: null,
                status: IsNull()
            } });
    
        // Create new seats
        const newSeats = seatSlots.map(seat => ({
            seat_number: seat.seat_number,
            row: seat.row,
            type: seat.type,
            status: false,
            showtimeHours: showtimeId,
            cinemaRoom: cinema_id,
        }));
    
        // Bulk insert for better performance
        await dataSource
            .getRepository(SeatSlot)
            .createQueryBuilder()
            .insert()
            .into(SeatSlot)
            .values(newSeats)
            .execute();
    
        return {
            data: showtimeId,
            message: "Showtime and seats created successfully.",
        };
    }
}