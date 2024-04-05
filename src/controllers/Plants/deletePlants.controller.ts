import { Controller, Delete, Param, UsePipes } from "@nestjs/common";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma-service";
import { z } from "zod";




@Controller('/plants')
export class deletePlants{
    constructor(private prisma: PrismaService) {}

    @Delete('/deletePlant:id')
    deletePlants(@Param('id') id: string) {
        console.log(id)
        console.log('Deletando planta')
        return this.prisma.planta.deleteMany();
    }
}