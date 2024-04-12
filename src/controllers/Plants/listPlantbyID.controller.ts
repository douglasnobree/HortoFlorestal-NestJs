import {
    Controller,
    Get,
    HttpCode,
    HttpException,
    Param,
    Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma/prisma-service';

@Controller('/plants')
export class listPlantByID {
    constructor(private prisma: PrismaService) {}

    @Get('/listPlantByID')
    @HttpCode(200)
    @ApiTags('Plants')
    async listplants(@Query('id') id: string) {
        const idNumber = parseInt(id);
        console.log('Listando todas as Plantas');
        try {
            const plant = await this.prisma.planta.findUnique({
                where: {
                    id: idNumber,
                },
            });
            if (!plant) {
                throw new HttpException(
                    {
                        message: 'Plant not found error',
                        statuscode: 404,
                    },
                    404
                );
            }
            return plant;
        } catch (error) {
            throw new HttpException(
                {
                    message: 'Plant not found',
                    statuscode: 404,
                },
                404
            );
        }
    }
}
