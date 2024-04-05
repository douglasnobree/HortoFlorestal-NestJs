import { Controller, Delete, Param, UsePipes } from "@nestjs/common";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma-service";
import { z } from "zod";

const plantSchema = z.object({
    id: z.number(),
});

type Plant = z.infer<typeof plantSchema>;


@Controller('/plants')
export class deletePlants{
    constructor(private prisma: PrismaService) {}

    @Delete('/deletePlant/:id')
    @UsePipes(new ZodValidationPipe(plantSchema))
    deletePlants(@Param('id') id: number) {
        console.log(id)
        console.log('Deletando planta')
        return this.prisma.planta.deleteMany();
    }
}