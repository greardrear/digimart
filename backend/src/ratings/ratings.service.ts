import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rating } from './ratings-entities/ratings.entity.js';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity.js';
import type { CreateRatingDto } from './ratings-dto/create-rating.dto.js';
import { UsersService } from '../users/users.service.js';

@Injectable()
export class RatingsService {
    constructor(
        @InjectRepository(Rating)
        private readonly ratingRepository: Repository<Rating>,
        private readonly usersService: UsersService
    ) {}

    async create(createRatingDto: CreateRatingDto, reviewerId: number): Promise<Rating> {

        if (reviewerId === createRatingDto.reviewedUserId) {
            throw new BadRequestException('You cannot rate yourself');
        }
        const reviewedUser = await this.usersService.findById(createRatingDto.reviewedUserId)
        const rating = this.ratingRepository.create({
            rating: createRatingDto.rating,
            comment: createRatingDto.comment,
            reviewer: {
                id: reviewerId,
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
