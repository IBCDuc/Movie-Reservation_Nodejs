import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { SeatSlot } from './Seat_slot';

@Entity('CinemaRoom')
export class CinemaRoom {
  @PrimaryGeneratedColumn()
  cinema_id: number;

  @Column({ type: 'nvarchar', length: 100, nullable: false })
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: 'nvarchar', length: 50 })
  status: string;

  @OneToMany(() => SeatSlot, (seatSlot) => seatSlot.cinemaRoom)
  seatSlots: SeatSlot[];
}
