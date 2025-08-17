import { ApiProperty } from "@nestjs/swagger";
import { DebtsStatus } from "@prisma/client";

export class CreateDebtDto {
    @ApiProperty()
    name: string
    @ApiProperty()
    term: number
    @ApiProperty()
    description: string
    @ApiProperty()
    debterId: string
    @ApiProperty()
    createdAt?: string
    @ApiProperty()
    summaryAmount: number
    remainingMonths: number
    remainingAmount: number
    status: DebtsStatus
}
