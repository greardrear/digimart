import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service.js';
import { RatingsController } from './ratings.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './ratings-entities/ratings.entity.js';
import { UsersModule } from '../users/users.module.js';

@Module({
  imports: [TypeOrmModule.forFeature([Rating]), UsersModule],
  providers: [RatingsService],
  controllers: [RatingsController]
})
export class RatingsModule {}
