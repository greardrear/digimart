import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './entitites/listing.entity.js';
import { CreateListingDto } from './dto/create-listing.dto.js';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { User } from '../users/entities/user.entity.js';

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
       }) 

       return this.listingsRepository.save(listing);
    }

    async findAll(): Promise<Listing[]> {
        return this.listingsRepository.find({
            relations: {
                seller: true,
            },
            order: {
                createdAt: 'DESC',
            }
        });
    }
}
