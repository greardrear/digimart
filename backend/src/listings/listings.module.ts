import { Module } from '@nestjs/common';
import { ListingsService } from './listings.service.js';
import { ListingsController } from './listings.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listing } from './entitites/listing.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Listing])],
  providers: [ListingsService],
  controllers: [ListingsController]
})
export class ListingsModule {}
