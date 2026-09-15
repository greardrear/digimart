import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import type { Relation } from 'typeorm';

import { User } from '../../users/entities/user.entity.js';

@Entity('ratings')
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  rating: number;

  @Column({ type: 'varchar', length: 500 })
  comment: string;

  @ManyToOne(() => User, (user) => user.givenRatings, {
    nullable: false,
  })
  @JoinColumn({ name: 'reviewerId' })
  reviewer: Relation<User>;

  @RelationId((rating: Rating) => rating.reviewer)
  reviewerId: number;

  @ManyToOne(() => User, (user) => user.receivedRatings, {
    nullable: false,
  })
  @JoinColumn({ name: 'reviewedUserId' })
  reviewedUser: Relation<User>;

  @RelationId((rating: Rating) => rating.reviewedUser)
  reviewedUserId: number;
}
