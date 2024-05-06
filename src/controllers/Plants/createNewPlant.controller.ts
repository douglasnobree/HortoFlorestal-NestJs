import {
    BadRequestException,
    Body,
    Controller,
    HttpCode,
    Post,
    UseGuards,
    UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { PrismaService } from 'src/prisma/prisma-service';
import { z } from 'zod';
import { PlantaDto } from '../../feat/plants/dtos/planta-dto';
import { JwtAuthGuard } from 'src/feat/auth/guards/jwt.guard';

const userSchema = z.object({
    nome: z.string(),
    especie: z.string(),
    descricao: z.string(),
    img_url: z.string(),
    localizacao: z.string(),
    floracao: z.string(),
    curiosidades: z.string(),
    cuidados: z.string(),
    rega: z.string(),
    frutifera: z.boolean(),
    medicinal: z.boolean(),
    ornamental: z.boolean(),
    tipo: z.string(),
    utilidade: z.string(),
});



type Planta = z.infer<typeof userSchema>;

@Controller('/plants')
export class createNewPlant {
    constructor(private prisma: PrismaService) {}

    @Post('/createNewPlant')
    @ApiTags('Plants')
    @HttpCode(201)
    @UsePipes(new ZodValidationPipe(userSchema))
    @ApiBody({ type: PlantaDto })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    async createNewPlant(@Body() body: Planta) {
        
        const {
            nome,
            especie,
            descricao,
            img_url,
            localizacao,
            floracao,
            curiosidades,
            cuidados,
            rega,
            frutifera,
            medicinal,
            ornamental,
            tipo,
            utilidade,
        } = body;
        try {
            const newPlant = await this.prisma.planta.create({
                data: {
                    nome: nome,
                    especie: especie,
                    descricao: descricao,
                    img_url: img_url,
                    localizacao: localizacao,
                    floracao: floracao,
                    curiosidades: curiosidades,
                    cuidados: cuidados,
                    rega: rega,
                    frutifera: frutifera,
                    medicinal: medicinal,
                    ornamental: ornamental,
                    tipo: tipo,
                    utilidade: utilidade,
                },
            });
            return { message: 'Nova planta criada com sucesso', newPlant };
        } catch (error) {
            throw new BadRequestException('Erro ao criar nova planta');
        }
    }
}
