import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Reservation } from './Reservation';

@Entity('Report')
export class Report {
  @PrimaryGeneratedColumn()
  Report_id: number;

  @Column({ type: 'int', nullable: true })
  ticket_sell: number;

  @Column({ type: 'int', nullable: true })
  total_revenue: number;

  // Relationship with Reservation
  @ManyToOne(() => Reservation, (reservation) => reservation.reports, { nullable: false })
  @JoinColumn({ name: 'Reservation_id' })
  reservation: Reservation;
}
