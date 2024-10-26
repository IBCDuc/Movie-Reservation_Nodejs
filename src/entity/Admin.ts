import {
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
    ManyToOne, OneToMany, JoinColumn, OneToOne, JoinTable, ManyToMany
  } from 'typeorm';
import { Movie } from './Movie';
@Entity('Admin')
export class Admin {
  @PrimaryGeneratedColumn()
  admin_id: number;

  @Column({ type: 'nvarchar', length: 100 })
  admin_name: string;

  @Column({ type: 'nvarchar', length: 256 })
  admin_email: string;

  @Column({ type: 'nvarchar', length: 256 })
  password: string;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @ManyToMany(() => Movie, (movie) => movie.admins)
  @JoinTable({
    name: 'manage', // tên bảng trung gian
    joinColumn: { name: 'admin_id', referencedColumnName: 'admin_id' }, // khóa ngoại từ bảng Admin
    inverseJoinColumn: { name: 'movie_id', referencedColumnName: 'movie_id' } // khóa ngoại từ bảng Movie
  })
  movies: Movie[];
}