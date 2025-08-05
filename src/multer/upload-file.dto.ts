import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class UploadFileDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Yuklanadigan fayl (jpg, png va h.k.)',
  })
  @IsOptional()
  file: any;
}
