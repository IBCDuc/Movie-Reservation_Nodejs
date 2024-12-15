import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Movie } from './Movie';

@Entity('Admin')
export class Admin {
  @PrimaryGeneratedColumn()
  admin_id: number;

  @Column({ type: 'nvarchar', length: 100 })
  Admin_name: string;

  @Column({ type: 'nvarchar', length: 256 })
  Admin_email: string;

  @Column({ type: 'nvarchar', length: 256 })
  Password: string;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @ManyToMany(() => Movie, (movie) => movie.admins)
  @JoinTable({
    name: 'manage', // Tên bảng trung gian
    joinColumn: { name: 'admin_id', referencedColumnName: 'admin_id' }, // Khóa ngoại từ bảng Admin
    inverseJoinColumn: { name: 'Movie_id', referencedColumnName: 'Movie_id' }, // Khóa ngoại từ bảng Movie
  })
  movies: Movie[];
}
