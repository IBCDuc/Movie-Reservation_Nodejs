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

}