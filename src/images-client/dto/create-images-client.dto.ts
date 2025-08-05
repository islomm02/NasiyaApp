import { ApiProperty } from "@nestjs/swagger";

export class CreateImagesClientDto {
    @ApiProperty()
    image: string
    @ApiProperty()
    debterId: string
}
