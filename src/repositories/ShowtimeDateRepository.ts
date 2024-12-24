
import { AppDataSource as dataSource } from "../data-source";
import { Movie } from "../entity/Movie";
import { ShowtimeDate } from "../entity/Showtime_date";

export default class ShowtimeDateRepository {
  static async getShowTimeDate() {
    const getShowtimeDate = await dataSource
          .getRepository(ShowtimeDate)
          .createQueryBuilder("showtime_date")
          .innerJoinAndSelect('showtime_date.movie', 'movie')
        
          .getMany()
    return {data: getShowtimeDate,
            total: getShowtimeDate.length
    }
  }
  static async addShowtimeDate(movie_id, date, status) {
    // Kiểm tra xem ngày chiếu đã tồn tại chưa
    const existingDate = await dataSource
      .getRepository(ShowtimeDate)
      .createQueryBuilder("showtimeDate")
      .where("showtimeDate.Movie_date = :date", { date })
      .andWhere("showtimeDate.movie = :movie_id", { movie_id })
      .getOne();
  
    if (existingDate) {
      // Nếu ngày chiếu đã tồn tại, trả về thông báo là true
      return { message: "true", data: existingDate };
    }
    // Thêm mới ngày chiếu nếu không tồn tại
    const insertedResult = await dataSource
      .createQueryBuilder()
      .insert()
      .into(ShowtimeDate)
      .values([
        {
          Movie_date: date,
          status: status,
          movie: movie_id, // Liên kết khóa ngoại (nếu có)
        },
      ])
      .output("INSERTED.*") // SQL Server hỗ trợ `output` để lấy dữ liệu vừa thêm
      .execute();
  
    const insertedData = insertedResult.raw[0];
  
    return { message: "fail", data: insertedData };
  }


  
}
