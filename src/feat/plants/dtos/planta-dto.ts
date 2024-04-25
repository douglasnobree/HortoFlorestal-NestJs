import { ApiProperty } from "@nestjs/swagger";


export class PlantaDto{
    @ApiProperty()
    id?: number;
    
    @ApiProperty()
    nome!: string;

    @ApiProperty()
    especie!: string;

    @ApiProperty()
    descricao!: string;

    @ApiProperty()
    img_url!: string;

    @ApiProperty()
    localizacao!: string;

    @ApiProperty()
    floracao!: string;

    @ApiProperty()
    curiosidades!: string;

    @ApiProperty()
    cuidados!: string;

    @ApiProperty()
    rega!: string;

    @ApiProperty()
    frutifera!: boolean;

    @ApiProperty()
    medicinal!: boolean;

    @ApiProperty()
    ornamental!: boolean;

    @ApiProperty()
    tipo!: string;

    @ApiProperty()
    utilidade!: string;
    
}