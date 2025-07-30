import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAdminDto } from './create-admin.dto';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
    @ApiProperty()
        username: string
        @ApiProperty()
        password: string
        @ApiProperty()
        phone: string
}
