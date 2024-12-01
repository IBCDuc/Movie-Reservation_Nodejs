
import { AppDataSource as dataSource } from "../data-source";
import { Movie } from "../entity/Movie";
export default class MovieRepository {

    static async getMovie() {
    const movie = await dataSource
        .getRepository(Movie)
        .createQueryBuilder("movie")
        .getMany()
    return movie
    }
    static async getMovieById(id) {
        const movie = await dataSource
            .getRepository(Movie)
            .createQueryBuilder("movie")
            .where("movie.Movie_id = :id", {id: id} )
            .getOne()
        return movie
    }
}