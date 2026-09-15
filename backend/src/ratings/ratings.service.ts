import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rating } from './ratings-entities/ratings.entity.js';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity.js';
import type { CreateRatingDto } from './ratings-dto/create-rating.dto.js';

@Injectable()
export class RatingsService {
    constructor(
        @InjectRepository(Rating)
        private readonly ratingRepository: Repository<Rating> 
    ) {}

    async create(createRatingDto: CreateRatingDto): Promise<Rating> {
        const rating = this.ratingRepository.create({
            rating: createRatingDto.rating,
            comment: createRatingDto.comment,
            reviewer: {
                id: createRatingDto.reviewerId,
            } as User,
            reviewedUser: {
                id: createRatingDto.reviewedUserId,
            } as User,
        });
        return this.ratingRepository.save(rating);
    }

    async getRatingsForUser(userId: number): Promise<Rating[]> {
        return this.ratingRepository.find({
            where: {
                reviewedUser: {
                    id: userId
                },
            },
                relations: {
                    reviewer: true,
                }
        });
    }
}
