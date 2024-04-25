import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma/prisma-service';

@Controller('/plants')
export class listAllPlants {
    constructor(private prisma: PrismaService) {}

    @Get('/listAllPlants')
    @HttpCode(200)
    @ApiTags('Plants')

    listplants() {
        console.log('Listando todas as Plantas');
        return this.prisma.planta.findMany();
    }
}
