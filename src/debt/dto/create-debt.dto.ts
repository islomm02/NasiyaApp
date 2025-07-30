import { ApiProperty } from "@nestjs/swagger";

export class CreateDebtDto {
    @ApiProperty()
    name: string
    @ApiProperty()
    term: string
    @ApiProperty()
    description: string
}
