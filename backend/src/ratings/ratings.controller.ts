import { Body, Controller, Get, ParseIntPipe, Param, Post } from '@nestjs/common';
import { RatingsService } from './ratings.service.js';
import type { CreateRatingDto } from './ratings-dto/create-rating.dto.js';

@Controller('ratings')
export class RatingsController {

    constructor(
        private readonly ratingService: RatingsService
    ) {}

    @Post()
    create(@Body() createRatingDto: CreateRatingDto) {
        return this.ratingService.create(createRatingDto);
    }

    @Get('user/:userId')
    getRatingsForUser(
    @Param('userId', ParseIntPipe) userId: number) {
        return this.ratingService.getRatingsForUser(userId);
}
}
