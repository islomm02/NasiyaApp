import { ApiProperty } from "@nestjs/swagger";

export class CreateChatDto {
    @ApiProperty()
    debterId: string
    @ApiProperty()
    message: string[]
    sellerId:string
}
