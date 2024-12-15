import axios from 'axios';
import { AppDataSource } from '../data-source'; // Import DataSource của TypeORM
import { Movie } from '../entity/Movie';

const TMDB_API_KEY = 'e30a7575113bc420088ff0dbab4bd9dd';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

interface TMDBMovie {
  title: string;
  poster_path: string | null;
  overview: string | null;
  genre_ids: number[];
  vote_average: number;
  release_date: string;
}

// Hàm lấy tất cả các thể loại phim từ TMDB (để map genre IDs thành tên)
const fetchGenres = async (): Promise<Record<number, string>> => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/genre/movie/list`, {
      params: { api_key: TMDB_API_KEY },
    });
    const genres: Record<number, string> = {};
    response.data.genres.forEach((genre: { id: number; name: string }) => {
      genres[genre.id] = genre.name;
    });
    return genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

// Hàm lấy 100 bộ phim
const fetchMovies = async (): Promise<TMDBMovie[]> => {
  try {
    const movies: TMDBMovie[] = [];
    let page = 1;

    while (movies.length < 100) {
      const response = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
        params: { api_key: TMDB_API_KEY, page },
      });

      const results = response.data.results as TMDBMovie[];
      movies.push(...results);
      page += 1;

      if (movies.length >= 100 || page > response.data.total_pages) {
        break;
      }
    }

    return movies.slice(0, 100); // Giới hạn đúng 100 phim
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

// Hàm lưu phim vào database
const saveMoviesToDB = async (movies: TMDBMovie[], genres: Record<number, string>, movieRepository) => {
  
  const movieEntities = movies.map((movie) => {
    const movieEntity = new Movie();
    movieEntity.Movie_name = movie.title;
    movieEntity.img_url = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : null;
    movieEntity.description = movie.overview;
    movieEntity.genre = movie.genre_ids.map((id) => genres[id]).join(', ');
    movieEntity.star = Math.round(movie.vote_average); // Làm tròn điểm đánh giá
    movieEntity.price = 50000; // Giá mặc định
    return movieEntity;
  });

  await movieRepository.save(movieEntities);
  console.log('Movies saved successfully!');
};

// Hàm chính
const syncMovies = async () => {
  try {
    console.log('Initializing database connection...');
    await AppDataSource.initialize(); // Đảm bảo kết nối đã hoàn tất trước khi sử dụng repository

    console.log('Fetching genres...');
    const genres = await fetchGenres();

    console.log('Fetching movies...');
    const movies = await fetchMovies();

    console.log('Saving movies to database...');
    const movieRepository = AppDataSource.getRepository(Movie);
    await saveMoviesToDB(movies, genres, movieRepository);

    console.log('Movies synced successfully!');
  } catch (error) {
    console.error('Error syncing movies:', error);
  }
};

// Chạy hàm đồng bộ
syncMovies();
