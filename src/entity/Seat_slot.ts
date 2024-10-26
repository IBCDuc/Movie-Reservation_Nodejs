import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Reservation } from './Reservation';
import { ShowtimeHours } from './Showtime_hours';
@Entity('Seat_slot')
export class SeatSlot {
  @PrimaryGeneratedColumn()
  slot_id: number;

  @Column({ type: 'int' })
  seat_number: number;

  @Column({ type: 'bit' })
  status: boolean;

  @OneToMany(() => Reservation, (reservation) => reservation.seat_slot)
  reservations: Reservation[];

  @ManyToOne(() => ShowtimeHours, (showtimeHours) => showtimeHours.seat_slots)
  showtime_hours: ShowtimeHours;
}
