import { ApiProperty } from "@nestjs/swagger";

export class CreateExampleMessageDto {
    @ApiProperty()
    text: string
}
