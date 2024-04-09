import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller('/')
export class lifeProfAPI {
    @Get('/')
    @HttpCode(200)
    listLifeProff() {
        return 'API Funcionando!';
    }
}
