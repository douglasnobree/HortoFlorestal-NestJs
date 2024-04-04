import { Controller, Post } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma-service";
@Controller('/plants')
export class createNewPlant{
    constructor(private prisma: PrismaService) {}

    @Post('/createNewPlant')
    createNewPlant() {}
}