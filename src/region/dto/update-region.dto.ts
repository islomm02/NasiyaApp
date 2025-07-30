import { PartialType } from '@nestjs/mapped-types';
import { CreateRegionDto } from './create-region.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRegionDto extends PartialType(CreateRegionDto) {
    @ApiProperty()
        name:string
}
