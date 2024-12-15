
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
        return movie
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
}