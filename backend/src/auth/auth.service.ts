import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto.js';
import * as bcrypt from 'bcrypt'
import { User } from '../users/entities/user.entity.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async register(dto: RegisterDto) {
        const email = dto.email.trim().toLowerCase();
        const existingUser = await this.usersService.findByEmail(email);

        if (existingUser) {
            throw new ConflictException('Korisnik sa ovim mejlom postoji');
        }

            const passwordHash = await bcrypt.hash(dto.password, 12);

            const user = await this.usersService.createUser({
                email,
                password: passwordHash,
                firstName: dto.firstName.trim(),
                lastName: dto.lastName.trim(),
                phone: dto.phone.trim(),
                location: dto.location.trim(),
                longitude: dto.longitude,
                latitude: dto.latitude
            });

            const accessToken = await this.createAccessToken(user);

            return {
                user: this.toUserResponse(user),
                accessToken
            }
    }

    async login(dto: LoginDto) {
        const email = dto.email.trim().toLowerCase();
        const user = await this.usersService.findByEmailForAuth(email);

        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const passwordMatches = await bcrypt.compare(dto.password, user.password);
        if (!passwordMatches) {
            throw new UnauthorizedException('Invalid email or password')
        }

        const accessToken = await this.createAccessToken(user);
        return {
            user: this.toUserResponse(user),
            accessToken
        }

    }

    private async createAccessToken(user: {id: number, email:string}): Promise<string> {
        return this.jwtService.signAsync({
            sub: user.id,
            email: user.email
        });
    }

    private toUserResponse(user: User) {
        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            role: user.role,
            status: user.status,
            location: user.location,
            latitude: user.latitude,
            longitude: user.longitude,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }
    }
}
