import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { ShowtimeHours } from './Showtime_hours';
import { Movie } from './Movie';

@Entity('Showtime_date')
export class ShowtimeDate {
  @PrimaryGeneratedColumn()
  showtime_date_id: number;

  @Column()
  movie_id: number; // Khóa ngoại liên kết với Movie

  @Column()
  movie_date: Date; 

  @OneToMany(() => ShowtimeHours, (showtimeHours) => showtimeHours.showtime_date)
  showtime_hours: ShowtimeHours[];

  @ManyToOne(() => Movie, (movie) => movie.showtime_dates)
  movie: Movie;
}
