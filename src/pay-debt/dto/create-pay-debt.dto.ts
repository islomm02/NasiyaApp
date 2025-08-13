import { ApiProperty } from "@nestjs/swagger";

export class CreatePayDebtDto {
    @ApiProperty()
    debtId: string
    @ApiProperty()
    month: number
}

export class CreatePayDebtDtoAny {
    @ApiProperty()
    debtId: string
    @ApiProperty()
    amount: number
}



