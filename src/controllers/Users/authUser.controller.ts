import { NotFoundException, UnauthorizedException, UsePipes } from '@nestjs/common';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { PrismaService } from 'src/prisma/prisma-service';
import { z } from 'zod';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

const userSchema = z.object({
    username: z.string(),
    password: z.string(),
});

type User = z.infer<typeof userSchema>;

@Controller('users')
export class AuthUser {
    constructor(private prisma: PrismaService) {}

    @Post('/login')
    @HttpCode(200)
    @ApiTags('Users')
    @ApiOperation({ summary: 'User login' })
    @ApiResponse({ status: 200, description: 'User logged in successfully' })
    @ApiResponse({ status: 400, description: 'Bad request type' })
    @UsePipes(new ZodValidationPipe(userSchema))
    async login(@Body() body: User) {
        const { username, password } = body;
        console.log('Usuario tentanto se conectar: ', username, ' com senha: ', password)

        const user = await this.prisma.user.findUnique({
            where: {
                username: username,
            },
        });
        if (!user) {
            console.log('Usuario nao encontrado')
            throw new NotFoundException('User not found');
        }
        if (user.password !== password) {
            console.log('Senha invalida')
            throw new UnauthorizedException('Invalid password/email');
        }
        console.log('Usuario conectado')
        const {id} = user;
        return {message: 'Usuario logado!', id};
    }
}
