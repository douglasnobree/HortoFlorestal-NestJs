import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '../guards/local.guard';
import { AuthDto } from '../dtos/auth.dtos';
import { AuthService } from '../services/auth.service';
import { User } from '@prisma/client';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @ApiOperation({ summary: 'User login' })
    @ApiBody({ type: AuthDto })
    @UseGuards(LocalAuthGuard)
    async login(@Req() req) {
        const { id, email, username, password } = req.user;
        const data: User = { id, email, username, password };
        return this.authService.login(data);
    }
}
