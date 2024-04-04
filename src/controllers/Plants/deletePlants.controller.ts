import { Controller } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma-service";
@Controller('/plants')
export class deletePlants{
    constructor(private prisma: PrismaService) {}
}