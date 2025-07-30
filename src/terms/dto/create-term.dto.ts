import { ApiProperty } from "@nestjs/swagger";

export class CreateTermDto {
    @ApiProperty()
    term: string
}
