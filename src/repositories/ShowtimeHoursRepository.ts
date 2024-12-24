import { AppDataSource as dataSource } from "../data-source";
import { SeatSlot } from "../entity/Seat_slot";
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
    static async addHour(showtime_date_id, hour, cinema_id) {
        const result = await dataSource
            .createQueryBuilder()
            .insert()
            .into(ShowtimeHours)
            .values([
                {
                    showtimeDate: showtime_date_id,  // Truyền vào showtime_date_id
                    Movie_hour: hour,
                },
            ])
            .returning(["Showtime_hours_id"])  // Trả về Showtime_hours_id
            .execute();
    
        // Lấy ID của ShowtimeHours vừa được thêm
        const showtimeId = result.generatedMaps[0].Showtime_hours_id;
    
        // Lấy tất cả ghế của phòng chiếu
        const seatSlots = await dataSource
            .getRepository(SeatSlot)
            .find({ where: { cinemaRoom: { cinema_id } } });
    
        // Tạo ghế mới cho giờ chiếu mới
        for (let seat of seatSlots) {
            const newSeat = dataSource.getRepository(SeatSlot).create({
                seat_number: seat.seat_number,
                row: seat.row,
                type: seat.type,
                status: false,  // Ghế mới sẽ luôn có trạng thái trống (status = 0)
                showtimeHours: showtimeId, // Liên kết với giờ chiếu vừa được thêm
                cinemaRoom: cinema_id, // Giữ liên kết với phòng chiếu
            });
    
            // Lưu ghế mới vào cơ sở dữ liệu
            await dataSource.getRepository(SeatSlot).save(newSeat);
        }
    
        return {
            data: showtimeId,  
            message: "Showtime and seats created successfully.",
        };
    }
    
    
    
}