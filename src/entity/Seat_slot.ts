import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ShowtimeHours } from './Showtime_hours';
import { Reservation } from './Reservation';
import { CinemaRoom } from './Cinema';
@Entity('Seat_slot') // Tên bảng trong database
export class SeatSlot {
  @PrimaryGeneratedColumn()
  slot_id: number; // Khóa chính (Slot_id)

  @Column()
  seat_number: number; // Số ghế (Seat_number)

  @Column({ type: 'bit', default: 0 })
  status: boolean; // Trạng thái ghế (status): 0 - trống, 1 - đã đặt

  @Column({ type: 'nvarchar', length: 50, nullable: true })
  type: string;

  @Column({ type: 'nvarchar', length: 50, nullable: true })
  row: string;

  @ManyToOne(() => ShowtimeHours, (showtimeHours) => showtimeHours.seatSlots)
  @JoinColumn({ name: 'showtime_hours_id' }) // Cột ngoại khóa trỏ đến bảng ShowtimeHours
  showtimeHours: ShowtimeHours; // Quan hệ N-1: Một SeatSlot thuộc một ShowtimeHours

  @OneToMany(() => Reservation, (reservation) => reservation.seatSlot)
  reservations: Reservation[]; // Quan hệ 1-N: Một SeatSlot có thể có nhiều Reservation

  @ManyToOne(() => CinemaRoom, (cinemaRoom) => cinemaRoom.seatSlots)
  @JoinColumn({ name: "cinema_id"})
  cinemaRoom: CinemaRoom;
}
