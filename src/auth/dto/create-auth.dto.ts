import { ApiProperty } from "@nestjs/swagger";

export class LoginSellerDto {
    @ApiProperty()
    login: string
    @ApiProperty()
    password: string
}

export class LoginAdminDto {
    @ApiProperty()
    username: string
    @ApiProperty()
    password: string
}

export class RefreshDto {
    @ApiProperty()
    refreshToken: string
    
}
