
import { AppDataSource as dataSource } from "../data-source";
import { CinemaRoom } from "../entity/Cinema";
import { Movie } from "../entity/Movie";
export default class CinemaRepository {

    static async getCinema() {
        const cinemas = await dataSource
            .getRepository(CinemaRoom)
            .createQueryBuilder("cinema")
            .leftJoinAndSelect("cinema.seatSlots", "seat")  // Lấy các ghế liên quan tới mỗi phòng chiếu
            .getMany();
    
        // Tổ chức lại dữ liệu thành định dạng mong muốn
        const result = cinemas.map(cinema => {
            // Nhóm ghế theo hàng (row)
            
            const groupedSeats = cinema.seatSlots.reduce((acc, seat) => {
                const row = seat.row; // Sử dụng trường row để nhóm các ghế theo hàng
                
                if (!acc[row]) {
                    acc[row] = { row, seats: [] };
                }
    
                // Loại bỏ các ghế trùng lặp dựa trên seat_number và slot_id
                const existingSeat = acc[row].seats.find(existing => existing.seatNumber === seat.seat_number);
                if (!existingSeat) {
                    acc[row].seats.push({
                        seatNumber: seat.seat_number, // Số ghế
                        status: seat.status ? 'booked' : 'available', // Trạng thái ghế (booked nếu status = 1, available nếu status = 0)
                        slotId: seat.slot_id, // Thêm slot_id cho mỗi ghế
                        type: seat.type
                    });
                }
    
                return acc;
            }, {});
    
            // Chuyển đối tượng nhóm ghế thành mảng
            const seats = Object.values(groupedSeats);
    
            return {
                cinemaId: cinema.cinema_id,
                cinemaName: cinema.name,
                cinemaStatus: cinema.status,
                seats, // Trả về thông tin ghế theo từng hàng
            };
        });
    
        return {
            data: result,
            total: result.length,
        };
    }


  static async addCinema(name, status) {
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(CinemaRoom)
      .values([
        {
          name: name,
          status: status,
          created_at: new Date().toISOString().split('T')[0],
        },
      ])
      .execute();
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
    static async getMovieSearch(queryRT: string) {
        const movie = await dataSource
            .getRepository(Movie)
            .createQueryBuilder("movie")
            .where("movie.Movie_name LIKE :name", {name: `%${queryRT}%`})
            .getMany()
        return {data: movie,
                total: movie.length
               }
    }

    static async getCinemaSelect(queryRT) {
        const movie = await dataSource
            .getRepository(Movie)
            .createQueryBuilder("movie")
            .where("movie.Movie_name LIKE :name", {name: `%${queryRT}%`})
            .getMany()
        return {data: movie,
                total: movie.length
               }
    }

}