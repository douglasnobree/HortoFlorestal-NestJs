import { ApiProperty } from '@nestjs/swagger';

export class tokenDto {
    @ApiProperty()
    token!: string;
}
