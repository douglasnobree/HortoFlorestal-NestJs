import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma/prisma-service';
import { AuthController } from './controller/auth.controller';
import { LocalAuthGuard } from './guards/local.guard';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt.guard';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [ConfigModule,
        PassportModule,
        JwtModule.registerAsync({
            useFactory: async () => ({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '8h' },
            }),
        })

    ],
    controllers: [AuthController],
    providers: [PrismaService, LocalAuthGuard, AuthService, LocalStrategy, JwtAuthGuard, JwtStrategy],
})
export class AuthModule {}
