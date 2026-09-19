import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CreateListingDto } from './dto/create-listing.dto.js';
import { ListingsService } from './listings.service.js';
import { FilterListingsDto } from './dto/filter-listings.dto.js';
import { AuthGuard } from '../auth/auth.guard.js';
import type { JwtPayload } from '../auth/types/jwt-payload.type.js';
import { CurrentUser } from '../auth/current-user.decorator.js';

@Controller('listings')
export class ListingsController {
    constructor(
        private readonly listingsService: ListingsService
    ) {}
    @UseGuards(AuthGuard)
    @Post()
    create(@Body() createListingDto: CreateListingDto,
           @CurrentUser() user: JwtPayload) {
        return this.listingsService.create(createListingDto, user.sub);
    }

    @Get()
    findAll(@Query() filter: FilterListingsDto): any {
        return this.listingsService.findAll(filter);
    }
}
 