import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Reservation } from './Reservation';

@Entity('Report')
export class Report {
  @PrimaryGeneratedColumn()
  report_id: number;

  @Column()
  reservation_id: number; // Khóa ngoại liên kết với Reservation

  @Column()
  ticket_sell: number;

  @Column()
  total_revenue: number;

  // Mối quan hệ với Reservation
  @OneToOne(() => Reservation, (reservation) => reservation.report)
  @JoinColumn({ name: 'reservation_id' }) // Chỉ định khóa ngoại
  reservation: Reservation;
}
