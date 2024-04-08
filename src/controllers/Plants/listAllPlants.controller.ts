import { Controller, Get, HttpCode } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma-service';

@Controller('/plants')
export class listAllPlants {
    constructor(private prisma: PrismaService) {}

    @Get('/listAllPlants')
    @HttpCode(200)
    listplants() {
        console.log('Listando todas as Plantas')
        return this.prisma.planta.findMany();
    }
}
