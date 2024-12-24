import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Reservation } from './Reservation';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ type: 'nvarchar', length: 100 })
  user_name: string;

  @Column({ type: 'nvarchar', length: 256 })
  email: string;

  @Column({ type: 'nvarchar', length: 256 })
  password: string;

  @Column({ 
    type: 'nvarchar', 
    length: 20, 
    default: 'user' 
  })
  role: string;

  @Column({ type: 'int' })
  phone: number;

  @Column({ type: 'nvarchar', length: 100 })
  address: string;

  @Column({ type: 'nvarchar', length: 200 })
  avatar: string;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];
}
