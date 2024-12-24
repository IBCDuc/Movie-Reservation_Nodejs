
import { AppDataSource as dataSource } from "../data-source";
import { Movie } from "../entity/Movie";
export default class MovieRepository {

    static async getMovie() {
    const movie = await dataSource
        .getRepository(Movie)
        .createQueryBuilder("movie")
        .getMany()
    return {data: movie,
            total: movie.length
    }
    }
    static async getMovieById(id) {
        const movie = await dataSource
            .getRepository(Movie)
            .createQueryBuilder("movie")
            .where("movie.Movie_id = :id", {id: id} )
            .getOne()
        return {
            data: movie
        }
    }
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
    static async getTopMovie() {
        const movie = await dataSource
            .getRepository(Movie)
            .createQueryBuilder("movie")
            .take(6)
            .getMany()
        return {data: movie,
                total: movie.length
        }
    }
    static async logicShowtime(movieId) {
        const movie = await dataSource
        .getRepository(Movie)
        .createQueryBuilder('movie')
        .leftJoinAndSelect('movie.showtimeDates', 'showtimeDate')
        .leftJoinAndSelect('showtimeDate.showtimeHours', 'showtimeHour')
        .leftJoinAndSelect('showtimeHour.seatSlots', 'seatSlot')
        .leftJoinAndSelect('seatSlot.cinemaRoom', 'cinemaRoom')
        .where('movie.movie_id = :movieId', { movieId }) // Điều kiện theo movieId
        .getOne();
        return movie
    }    
    
    static async logicShowtimeWithCinemaId(movieId, cinemaId) {
        const movie = await dataSource
            .getRepository(Movie)
            .createQueryBuilder('movie')
            .leftJoinAndSelect('movie.showtimeDates', 'showtimeDate')
            .leftJoinAndSelect('showtimeDate.showtimeHours', 'showtimeHour')
            .leftJoinAndSelect('showtimeHour.seatSlots', 'seatSlot')
            .leftJoinAndSelect('seatSlot.cinemaRoom', 'cinemaRoom')
            .where('movie.movie_id = :movieId', { movieId }) // Điều kiện theo movieId
            .andWhere('cinemaRoom.cinema_id = :cinemaId', { cinemaId }) // Điều kiện theo cinemaId
            .getOne();
        return movie;
    }

    static async getTopMoviesByReservations() {
        return await dataSource
            .getRepository(Movie)
            .createQueryBuilder("movie")
            .leftJoin("movie.showtimeDates", "showtimeDate")
            .leftJoin("showtimeDate.showtimeHours", "showtimeHour")
            .leftJoin("showtimeHour.seatSlots", "seatSlot")
            .leftJoin("seatSlot.reservations", "reservation")
            .select([
                "movie.Movie_name as movieName",
                "COUNT(DISTINCT reservation.Reservation_id) as reservationCount"
            ])
            .groupBy("movie.Movie_id, movie.Movie_name") // Added Movie_name to GROUP BY
            .orderBy("reservationCount", "DESC")
            .limit(5)
            .getRawMany();
    }

}