import {  ApiProperty } from "@nestjs/swagger";

export class CreateSellerDto {
    @ApiProperty()
    login:string
    @ApiProperty()
    phone:string
    @ApiProperty()
    password: string
    @ApiProperty()
    name: string
    @ApiProperty()
    PINcode:number
    @ApiProperty()
    email:string
}
