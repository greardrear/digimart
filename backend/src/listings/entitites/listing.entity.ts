import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ListingCategory } from '../enums/listing-category.enum.js';
import { User } from '../../users/entities/user.entity.js';

@Entity('listings')
export class Listing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 225 })
  title: string;

  @Column({ type: 'varchar', length: 500 })
  description: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  price: string;

  @Column({ type: 'decimal', precision: 12, scale: 3 })
  availableQuantity: string;

  @Column({
    type: 'enum',
    enum: ListingCategory,
  })
  category: ListingCategory;

  @ManyToOne(() => User, {
    nullable: false,
  })
  @JoinColumn({ name: 'seller_id' })
  seller: User;

  @Column({ type: 'timestamptz', nullable: true })
  premiumPurchasedAt?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  premiumExpiresAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}