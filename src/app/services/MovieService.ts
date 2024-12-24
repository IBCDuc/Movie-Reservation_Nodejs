import { Movie } from "../../entity/Movie";
import MovieRepository from "../../repositories/MovieRepository";

export class MovieService {
    static async getAllMovie() {
        const movie = await MovieRepository.getMovie()
        return movie
    }
    static async getMovieById(id) {
        const movie = await MovieRepository.getMovieById(id)
        return movie
    }
    static async getMovieSearch(queryRT: string) {
        const movieRes = await MovieRepository.getMovieSearch(queryRT)
        return movieRes
    }

    static async getTopMovie() {
        const res = await MovieRepository.getTopMovie()
        return res
    }

    static async logicShowTime(movieId) {
        const movie = await MovieRepository.logicShowtime(movieId)
        return {
          movieId: movie.Movie_id,
          movieTitle: movie.Movie_name,
          movieImg: movie.img_url,
          showTimes: movie.showtimeDates.map((showtimeDate) => ({
            date: showtimeDate.Movie_date,
            times: showtimeDate.showtimeHours.map((showtimeHour) => {
              const cinemaRoomName =
                showtimeHour.seatSlots.length > 0 &&
                showtimeHour.seatSlots[0].cinemaRoom
                  ? showtimeHour.seatSlots[0].cinemaRoom.name
                  : 'Unknown Cinema Room';
    
              return {
                cinemaName: `${cinemaRoomName}`,
                available: true,
                time: showtimeHour.Movie_hour,
                seats: showtimeHour.seatSlots.map((seat) => ({
                  seatNumber: seat.seat_number,
                  row: seat.row,
                  type: seat.type,
                  isBooked: seat.status,
                })),
              };
            }),
          })),
        };
      }

      static async logicShowTimeCinema(movieId, cinemaId) {
        const movie = await MovieRepository.logicShowtimeWithCinemaId(movieId, cinemaId);
        return {
            movieId: movie.Movie_id,
            movieTitle: movie.Movie_name,
            movieImg: movie.img_url,
            showTimes: movie.showtimeDates.map((showtimeDate) => ({
                date: showtimeDate.Movie_date,
                times: showtimeDate.showtimeHours.map((showtimeHour) => {
                    const cinemaRoomName =
                        showtimeHour.seatSlots.length > 0 &&
                        showtimeHour.seatSlots[0].cinemaRoom
                            ? showtimeHour.seatSlots[0].cinemaRoom.name
                            : 'Unknown Cinema Room';
    
                    return {
                        cinemaName: `${cinemaRoomName}`,
                        available: true,
                        time: showtimeHour.Movie_hour,
                        seats: showtimeHour.seatSlots.map((seat) => ({
                            seatId: seat.slot_id,
                            seatNumber: seat.seat_number,
                            row: seat.row,
                            type: seat.type,
                            isBooked: seat.status,
                        })),
                    };
                }),
            })),
        };
    }
    static async getTopMoviesByReservations() {
      const results = await MovieRepository.getTopMoviesByReservations();
      return results.map(item => ({
          movieName: item.movieName,
          reservationCount: parseInt(item.reservationCount)
      }));
  }
  }