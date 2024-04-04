import { Controller, Delete } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma-service";
@Controller('/plants')
export class deletePlants{
    constructor(private prisma: PrismaService) {}

    @Delete('/deletePlant')
    deletePlants() {
        console.log('Deletando planta')
        return this.prisma.planta.deleteMany();
    }
}