
import { AppDataSource as dataSource } from "../data-source";
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
    const insertedResult = await dataSource
    .createQueryBuilder()
    .insert()
    .into(ShowtimeDate)
    .values([
      {
        Movie_date: date,
        status: status,
        movie: movie_id , // Liên kết khóa ngoại (nếu có)
      },
    ])
    .output('INSERTED.*') // SQL Server hỗ trợ `output` để lấy dữ liệu vừa thêm
    .execute();

    const insertedData = insertedResult.raw[0];

    return {data: insertedData};

  }
}
