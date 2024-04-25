import { PrismaService } from 'src/prisma/prisma-service';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService
    ) {}

    async validateUser(username: string, password: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                username: username,
            },
        });
        if (user && password == user.password) {
            return user;
        }
        return null;
    }

    async login(user: User) {
        if (user) {
            const payload = { username: user.username};
            const token = this.jwt.sign(payload, { secret: process.env.JWT_SECRET });
            const a = this.jwt.verify(token);
            return { token: token };
        }
    }
}
