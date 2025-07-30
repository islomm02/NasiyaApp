import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSellerDto } from './create-seller.dto';

export class UpdateSellerDto extends PartialType(CreateSellerDto) {
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
