import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from './Users';
import { SeatSlot } from './Seat_slot';
import { Report } from './Report';

@Entity('Reservation')
export class Reservation {
  @PrimaryGeneratedColumn()
  reservation_id: number;

  @CreateDateColumn()
  time_reservation: Date;

  @Column()
  user_id: number;

  @Column()
  slot_id: number;

  // Mối quan hệ với User
  @ManyToOne(() => User, (user) => user.reservations, { onDelete: 'CASCADE' })
  user: User;

  // Mối quan hệ với SeatSlot
  @ManyToOne(() => SeatSlot, (seatSlot) => seatSlot.reservations, { onDelete: 'CASCADE' })
  seat_slot: SeatSlot;

  // Mối quan hệ với Report
  @OneToOne(() => Report, (report) => report.reservation, { cascade: true })
  report: Report;
}
