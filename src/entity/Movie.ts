import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from 'typeorm';
import { Admin } from './Admin';
import { ShowtimeDate } from './Showtime_date';

@Entity('Movie')
export class Movie {
  @PrimaryGeneratedColumn()
  movie_id: number;

  @Column({ type: 'nvarchar', length: 255 })
  movie_name: string;

  @Column({ type: 'nvarchar', length: 1000 })
  img_url: string;

  @Column({ type: 'nvarchar', length: 2500 })
  description: string;

  @Column({ type: 'nvarchar', length: 1000 })
  genre: string;

  @Column({ type: 'int' })
  star: number;

  @Column({ type: 'int' })
  price: number;

  @ManyToMany(() => Admin, (admin) => admin.movies)
  admins: Admin[];

  @OneToMany(() => ShowtimeDate, (showtimeDate) => showtimeDate.movie)
  showtime_dates: ShowtimeDate[];
}
