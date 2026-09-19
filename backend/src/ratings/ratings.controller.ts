import { Body, Controller, Get, ParseIntPipe, Param, Post, UseGuards } from '@nestjs/common';
import { RatingsService } from './ratings.service.js';
import type { CreateRatingDto } from './ratings-dto/create-rating.dto.js';
import { CurrentUser } from '../auth/current-user.decorator.js';
import type { JwtPayload } from '../auth/types/jwt-payload.type.js';

@Controller('ratings')
export class RatingsController {

    constructor(
        private readonly ratingService: RatingsService
    ) {}
    @UseGuards()
    @Post()
    create(@Body() createRatingDto: CreateRatingDto,
           @CurrentUser() user: JwtPayload) {
        return this.ratingService.create(createRatingDto, user.sub);
    }

    @Get('user/:userId')
    getRatingsForUser(
    @Param('userId', ParseIntPipe) userId: number) {
        return this.ratingService.getRatingsForUser(userId);
}
}
