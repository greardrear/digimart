import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity.js';

@Injectable()
export class UsersService {
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>;

    async createUser(data: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        phone: string;
        location: string;
        longitude: string;
        latitude: string;
    }): Promise<User> {
        
        const user = this.usersRepository.create(data);
        return this.usersRepository.save(user);
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOne({
            where: {
                email: email.toLowerCase(),
            },
        });
    }

    async findByEmailForAuth(email: string): Promise<User | null> {
        return this.usersRepository.createQueryBuilder('user')
            .addSelect('user.password')
            .where('user.email = :email', {
                email: email.toLowerCase(),
            })
            .getOne();
    }

    async findById(id: number): Promise<User | null> {
        return this.usersRepository.findOne({
            where: {
                id
            }
        })
    }
}
