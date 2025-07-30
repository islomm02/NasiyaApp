import { ApiProperty } from "@nestjs/swagger";

export class CreateDebterDto {
    @ApiProperty()
    name: string
    @ApiProperty()
    phone: string
    @ApiProperty()
    debtId: string
}
