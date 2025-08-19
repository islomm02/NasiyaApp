import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateImagesDebtDto } from './create-images-debt.dto';

export class UpdateImagesDebtDto {
    image: string[]
}
