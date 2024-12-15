import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn
} from 'typeorm';
import { Movie } from './Movie';
import { ShowtimeHours } from './Showtime_hours';

@Entity('Showtime_date')
export class ShowtimeDate {
  @PrimaryGeneratedColumn()
  Showtime_date_id: number;

  @Column({ type: 'datetime', nullable: true })
  Movie_date: Date;

  @Column( {type: 'nvarchar', length: 50, nullable: true} )
  status: string;

  @ManyToOne(() => Movie, (movie) => movie.showtimeDates)
  @JoinColumn({ name: "Movie_id" }) 
  movie: Movie; 

  @OneToMany(() => ShowtimeHours, (showtimeHours) => showtimeHours.showtimeDate)
  showtimeHours: ShowtimeHours[];
}
