import {
    BadRequestException,
    Body,
    Controller,
    HttpCode,
    Post,
    UsePipes,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { PrismaService } from 'src/prisma/prisma-service';
import { z } from 'zod';

const userSchema = z.object({
    nome: z.string(),
    especie: z.string(),
    descricao: z.string(),
    img_url: z.string(),
    localizacao: z.string(),
    floracao: z.string(),
    curiosidades: z.string(),
    cuidados: z.string(),
    rega: z.string()
});

type Planta = z.infer<typeof userSchema>;

@Controller('/plants')
export class createNewPlant {
    constructor(private prisma: PrismaService) {}

    @Post('/createNewPlant')
    @ApiTags('Plants')
    @HttpCode(201)
    @UsePipes(new ZodValidationPipe(userSchema))
    async createNewPlant(@Body() body: Planta) {
        const { nome, especie, descricao, img_url, localizacao, floracao, curiosidades, cuidados, rega } = body;
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
                    rega: rega
                },
            });
            return { message: 'Nova planta criada com sucesso', newPlant };
        } catch (error) {
            throw new BadRequestException('Erro ao criar nova planta');
        }
    }
}
