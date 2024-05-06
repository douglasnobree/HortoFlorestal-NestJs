import {
    BadRequestException,
    Body,
    Controller,
    HttpCode,
    Put,
    UseGuards,
    UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/feat/auth/guards/jwt.guard';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { PrismaService } from 'src/prisma/prisma-service';
import { z } from 'zod';
import { PlantaDto } from '../../feat/plants/dtos/planta-dto';

const userSchema = z.object({
    id: z.number(),
    nome: z.string(),
    especie: z.string(),
    descricao: z.string(),
    img_url: z.string(),
    localizacao: z.string(),
    floracao: z.string(),
    cuidados: z.string(),
    frutifera: z.boolean(),
    medicinal: z.boolean(),
    ornamental: z.boolean(),
    utilidade: z.string(),
});

type Planta = z.infer<typeof userSchema>;

@Controller('/plants')
export class editPlant {
    constructor(private prisma: PrismaService) {}

    @Put('/editPlant')
    @ApiTags('Plants')
    @HttpCode(201)
    @UsePipes(new ZodValidationPipe(userSchema))
    @ApiBearerAuth()
    @ApiBody({ type: PlantaDto })
    @UseGuards(JwtAuthGuard)
    async editPlant(@Body() body: Planta) {
        const {
            id,
            nome,
            especie,
            descricao,
            img_url,
            localizacao,
            floracao,
            cuidados,
            frutifera,
            medicinal,
            ornamental,
            utilidade,
        } = body;
        try {
            const plantaExistente = await this.prisma.planta.findUnique({
                where: {
                    id: id,
                },
            });


            if (!plantaExistente) {
                throw new BadRequestException('Planta não encontrada');
            }

            const plantaAtualizada = await this.prisma.planta.update({
                where: {
                    id: plantaExistente.id, 
                },
                data: {
                    nome,
                    especie,
                    descricao,
                    img_url,
                    cuidados,
                    floracao,
                    localizacao,
                    frutifera,
                    medicinal,
                    ornamental,
                    utilidade,
                },
            });

            return plantaAtualizada;
        } catch (error) {
            throw new BadRequestException('Erro ao editar planta');
        }
    }
}
