import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma-service';
import { AuthUser } from './controllers/Users/authUser.controller';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';
import { listAllPlants } from './controllers/Plants/listAllPlants.controller';
import { deletePlants } from './controllers/Plants/deletePlants.controller';
import { createNewPlant } from './controllers/Plants/createNewPlant.controller';
import { listPlantByID } from './controllers/Plants/listPlantbyID.controller';
import { editPlant } from './controllers/Plants/editPlant.controller';
import { AuthModule } from './feat/auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            validate: (env) => envSchema.parse(env),
            isGlobal: true,
        }),
        AuthModule,
    ],
    controllers: [
        AuthUser,
        listAllPlants,
        deletePlants,
        createNewPlant,
        listPlantByID,
        editPlant,
    ],
    providers: [PrismaService],
})
export class AppModule {}
