import { Controller, Delete, HttpException, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/feat/auth/guards/jwt.guard';
import { PrismaService } from 'src/prisma/prisma-service';

@Controller('/plants')
export class deletePlants {
    constructor(private prisma: PrismaService) {}

    @Delete('/deletePlant')
    @ApiTags('Plants')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    async deletePlants(@Query('id') id: string) {
        const idNumber = parseInt(id);
        console.log('Deletando planta com id:', id);
        try {
            await this.prisma.planta.delete({
                where: {
                    id: idNumber,
                },
            });
            return { message: 'Planta deletada com sucesso' };
        } catch (error) {
            throw new HttpException(
                {
                    message: 'Plant not found',
                    statuscode: 404,
                    error: error,
                },
                404
            );
        }
    }
}
