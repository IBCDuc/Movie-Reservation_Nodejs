import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { ShowtimeDate } from './Showtime_date';
import { SeatSlot } from './Seat_slot';

@Entity('Showtime_hours')
export class ShowtimeHours {
  @PrimaryGeneratedColumn()
  showtime_hours_id: number;

  @Column()
  showtime_date_id: number; // Khóa ngoại liên kết với Showtime_date

  @Column()
  movie_hour: Date; 

  // Mối quan hệ với ShowtimeDate
  @ManyToOne(() => ShowtimeDate, (showtimeDate) => showtimeDate.showtime_hours)
  showtime_date: ShowtimeDate;

  // Mối quan hệ với SeatSlot
  @OneToMany(() => SeatSlot, (seatSlot) => seatSlot.showtime_hours)
  seat_slots: SeatSlot[];
}
