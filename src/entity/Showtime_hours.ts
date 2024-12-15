import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ShowtimeDate } from './Showtime_date';
import { SeatSlot } from './Seat_slot';

@Entity('Showtime_hours')
export class ShowtimeHours {
  @PrimaryGeneratedColumn()
  Showtime_hours_id: number;

  @Column({type: 'nvarchar', length: 50, nullable: true})
  Movie_hour: string;

  @ManyToOne(() => ShowtimeDate, (showtimeDate) => showtimeDate.showtimeHours)
  @JoinColumn({ name: "Showtime_date_id" })
  showtimeDate: ShowtimeDate;

  @OneToMany(() => SeatSlot, (seatSlot) => seatSlot.showtimeHours)
  seatSlots: SeatSlot[];
}
