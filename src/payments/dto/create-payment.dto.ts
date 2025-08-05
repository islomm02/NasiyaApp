import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty()
  debtId: string;
  @ApiProperty()
  month: number;
}
