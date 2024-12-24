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
import { User } from './Users';
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

    @Column({ type: 'int', nullable: true })
    total_price: number;

    @Column({ type: 'nvarchar', nullable: true, length: 50 })
    status: string;

    // Relationship with SeatSlot
    @ManyToOne(() => SeatSlot, (seatSlot) => seatSlot.reservations, { nullable: true })
    @JoinColumn({ name: 'Slot_id' })
    seatSlot: SeatSlot;

    // Relationship with Report
    @OneToMany(() => Report, (report) => report.reservation)
    reports: Report[];

    @ManyToOne(() => User, (user) => user.reservations)
    @JoinColumn({ name: 'User_id' })
    user: User;
}
