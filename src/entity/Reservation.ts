import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { SeatSlot } from './Seat_slot';
import { Report } from './Report';

@Entity('Reservation')
export class Reservation {
  @PrimaryGeneratedColumn()
  Reservation_id: number;

  @Column({ type: 'int', nullable: true })
  User_id: number;

  @Column({ type: 'int', nullable: true })
  Slot_id: number;

  @CreateDateColumn()
  time_reservation: Date;

  // Relationship with SeatSlot
  @ManyToOne(() => SeatSlot, (seatSlot) => seatSlot.reservations, { nullable: true })
  @JoinColumn({ name: 'Slot_id' })
  seatSlot: SeatSlot;

  // Relationship with Report
  @OneToMany(() => Report, (report) => report.reservation)
  reports: Report[];
}
