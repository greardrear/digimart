import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateListingDto } from './dto/create-listing.dto.js';
import { ListingsService } from './listings.service.js';
import { FilterListingsDto } from './dto/filter-listings.dto.js';

@Controller('listings')
export class ListingsController {
    constructor(
        private readonly listingsService: ListingsService
    ) {}

    @Post()
    create(@Body() createListingDto: CreateListingDto) {
        return this.listingsService.create(createListingDto);
    }

    @Get()
    findAll(@Query() filter: FilterListingsDto): any {
        return this.listingsService.findAll(filter);
    }
}
 