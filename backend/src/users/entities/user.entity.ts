import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { Rating } from '../../ratings/ratings-entities/ratings.entity.js';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phone: string;

  @Column({ default: 'USER' })
  role: string;

  @Column({ default: 'ACTIVE' })
  status: string;

  @Column({ type: 'varchar', length: 100 })
  location: string;

  @Column({ type: 'decimal', precision: 9, scale: 6 })
  latitude: string;

  @Column({ type: 'decimal', precision: 9, scale: 6 })
  longitude: string;

  @OneToMany(() => Rating, (rating) => rating.reviewer)
  givenRatings: Relation<Rating[]>;

  @OneToMany(() => Rating, (rating) => rating.reviewedUser)
  receivedRatings: Relation<Rating[]>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
