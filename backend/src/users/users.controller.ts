import { Controller, Get, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';
import { JwtPayload } from '../auth/types/jwt-payload.type.js';
import { AuthGuard } from '../auth/auth.guard.js';
import { UsersService } from './users.service.js';

type AuthenticatedRequest =
  ExpressRequest & {
    user: JwtPayload;
  };
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {}

    @UseGuards(AuthGuard)
    @Get('me')
    async getMe(
        @Req() req: AuthenticatedRequest,
    ) {
        const user = await this.usersService.findById(req.user.sub);

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        return user;
    }
}
