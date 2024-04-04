import { Controller, Get } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma-service";


@Controller('/plants')
export class listAllPlants{
    constructor(private prisma: PrismaService) {}
    
    @Get('/listAllPlants')
    listplants(){
        return this.prisma.planta.findMany();
    }
}