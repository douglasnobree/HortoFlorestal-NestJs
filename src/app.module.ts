import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma-service';
import { AuthUser } from './controllers/Users/authUser.controller';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';

@Module({
    imports: [
        ConfigModule.forRoot({
            validate: (env) => envSchema.parse(env),
            isGlobal: true,
        }),
    ],
    controllers: [AuthUser],
    providers: [PrismaService],
})
export class AppModule {}
