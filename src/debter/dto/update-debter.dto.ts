import { PartialType } from '@nestjs/mapped-types';
import { CreateDebterDto } from './create-debter.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDebterDto extends PartialType(CreateDebterDto) {
    @ApiProperty()
        name: string
        @ApiProperty()
        phone: string
        @ApiProperty()
        debtId: string
}
