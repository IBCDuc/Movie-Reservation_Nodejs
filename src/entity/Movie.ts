import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { ShowtimeDate } from './Showtime_date';
import { Admin } from './Admin';

@Entity('Movie')
export class Movie {
  @PrimaryGeneratedColumn()
  Movie_id: number;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  Movie_name: string;

  @Column({ type: 'nvarchar', length: 1000, nullable: true })
  img_url: string;

  @Column({ type: 'nvarchar', length: 2500, nullable: true })
  description: string;

  @Column({ type: 'nvarchar', length: 1000, nullable: true })
  genre: string;

  @Column({ type: 'int', nullable: true })
  star: number;

  @Column({ type: 'int', nullable: true })
  price: number;

  @CreateDateColumn()
  create_at: Date;

  @OneToMany(() => ShowtimeDate, (showtimeDate) => showtimeDate.movie)
  showtimeDates: ShowtimeDate[];

  @ManyToMany(() => Admin, (admin) => admin.movies)
  admins: Admin[];
}
