import { ApiProperty } from "@nestjs/swagger";

export class CreateAdminDto {
    @ApiProperty()
    username: string
    @ApiProperty()
    password: string
    @ApiProperty()
    phone: string
}


export class ResetPasswordDto{
    @ApiProperty()
    username: string
}