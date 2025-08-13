import { ApiProperty } from "@nestjs/swagger";
export class CreateMessageDto {
    @ApiProperty()
    debterId: string
    @ApiProperty()
    message: string
    @ApiProperty()
    chatId: string
}
