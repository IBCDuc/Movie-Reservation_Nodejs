
import { AppDataSource as dataSource } from "../data-source";
import { CinemaRoom } from "../entity/Cinema";
import { SeatSlot } from "../entity/Seat_slot";
import { ShowtimeHours } from "../entity/Showtime_hours";
export default class SeatRepository {

  static async getSeat() {
    const seat = await dataSource
      .getRepository(SeatSlot)
      .createQueryBuilder("seat")
      .innerJoinAndSelect('seat.cinemaRoom', 'cinemaRoom')
      .getMany();
  
    return {
      data: seat,
      total: seat.length,
    };
  }
  
    static async addSeatBasedOnMovie(
        row: string,
        seat_number: number,
        type: string,
        cinemaId: number,

      ): Promise<void> {
        const cinemaRoom = await dataSource
          .getRepository(CinemaRoom)
          .findOne({ where: { cinema_id: cinemaId } });
      
        if (!cinemaRoom) {
          throw new Error(`CinemaRoom with ID ${cinemaId} does not exist`);
        }
      
        await dataSource
          .createQueryBuilder()
          .insert()
          .into(SeatSlot)
          .values([
            {
              row: row,
              seat_number: seat_number,
              type: type,
              // Ghế mặc định trống
              cinemaRoom: cinemaRoom, // Liên kết với CinemaRoom
            },
          ])
          .execute();
      }


  static async updateSeatSlotShowtime(cinemaId: number, showtimeHourId: number) {
    const seatSlots = await dataSource
      .getRepository(SeatSlot)
      .createQueryBuilder('seatSlot')
      .leftJoinAndSelect('seatSlot.showtimeHours', 'showtimeHours')
      .where('seatSlot.cinemaRoom.cinema_id = :cinemaId', { cinemaId })
      .getMany();

    for (const seatSlot of seatSlots) {
      seatSlot.showtimeHours = { Showtime_hours_id: showtimeHourId } as ShowtimeHours; // Cập nhật showtimeHours với showtimeHourId
    }

    await dataSource.getRepository(SeatSlot).save(seatSlots);

    return { message: 'SeatSlot showtime_hours_id updated successfully' };
  }

      
      
    // static async getMovieById(id) {
    //     const movie = await dataSource
    //         .getRepository(Movie)
    //         .createQueryBuilder("movie")
    //         .where("movie.Movie_id = :id", {id: id} )
    //         .getOne()
    //     return movie
    // }
    // static async getMovieAndAnotherLogic(id) {
    //     const movie = await dataSource
    //         .getRepository(Movie)
    //         .createQueryBuilder("movie")
    //         .innerJoin("")
    //         .where("movie.Movie_id = :id", {id: id})

    // }  
    // static async getMovieSearch(queryRT: string) {
    //     const movie = await dataSource
    //         .getRepository(Movie)
    //         .createQueryBuilder("movie")
    //         .where("movie.Movie_name LIKE :name", {name: `%${queryRT}%`})
    //         .getMany()
    //     return {data: movie,
    //             total: movie.length
    //         }
    // }
}