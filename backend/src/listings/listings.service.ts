import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './entitites/listing.entity.js';
import { CreateListingDto } from './dto/create-listing.dto.js';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { User } from '../users/entities/user.entity.js';
import { FilterListingsDto } from './dto/filter-listings.dto.js';

@Injectable()
export class ListingsService {
    constructor(
        @InjectRepository(Listing)
        private readonly listingsRepository: Repository<Listing>
    ) {}

    async create(createListingDto: CreateListingDto): Promise<Listing> {
       const listing = this.listingsRepository.create({
        title: createListingDto.title,
        description: createListingDto.description,
        price: createListingDto.price,
        availableQuantity: createListingDto.availableQuantity,
        category: createListingDto.category,
        seller: {
            id: createListingDto.sellerId,
        } as User,
        location: createListingDto.location,
        latitude: createListingDto.latitude,
        longitude: createListingDto.longitude,
       }) 

       return this.listingsRepository.save(listing);
    }

    async findAll(filter: FilterListingsDto): Promise<Listing[]> {
        const query = this.listingsRepository.createQueryBuilder('listing')
        .leftJoinAndSelect('listing.seller', 'seller');

        if (filter.title) {
            query.andWhere('listing.title ILIKE :title', { 
                title: `%${filter.title}%` 
            });
        }
        if (filter.category) {
            query.andWhere('listing.category = :category', { 
                category: filter.category 
            });
        }

        if (filter.latitude && filter.longitude ) {
            const lat = Number(filter.latitude);
            const lng = Number(filter.longitude);
            const radius = filter.radius ? Number(filter.radius) : 30; // Default 30km radius

            query.andWhere(`6371 * acos(cos(radians(:lat)) * cos(radians(CAST(listing.latitude AS double precision)))
                * cos(radians(CAST(listing.longitude AS double precision)) - radians(:lng))
                + sin(radians(:lat)) 
                * sin(radians(CAST(listing.latitude AS double precision)))) <= :radius`, 
                {
                lat,
                lng,
                radius
            },);
        }
        return query.getMany();
    }
}
