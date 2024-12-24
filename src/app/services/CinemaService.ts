import { Movie } from "../../entity/Movie";
import CinemaRepository from "../../repositories/CinemaRepository";
import MovieRepository from "../../repositories/MovieRepository";

export class CinemaService {
    static async getAllCinema() {
        const cinema = await CinemaRepository.getCinema()
        return cinema
    }
    static async addCinema(name, status) {
        const cinema = await CinemaRepository.addCinema(name, status)
        return cinema
    }

    // static async getCinema
}