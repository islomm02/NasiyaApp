import { ApiProperty } from "@nestjs/swagger";

export class LoginSellerDto {
    @ApiProperty()
    login: string
    @ApiProperty()
    password: string
}
