import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateImagesClientDto } from './create-images-client.dto';

export class UpdateImagesClientDto extends PartialType(CreateImagesClientDto) {
    @ApiProperty()
        image: string
        @ApiProperty()
        debterId: string
}
