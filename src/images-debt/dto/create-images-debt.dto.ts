import { ApiProperty } from '@nestjs/swagger';

export class CreateImagesDebtDto {
  @ApiProperty()
  image: string;
  @ApiProperty()
  debtId: string;
}
