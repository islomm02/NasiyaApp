import { ApiProperty } from "@nestjs/swagger";

export class CreatePayAllDebtDto {
    @ApiProperty()
    debtId: string
}