import { PartialType } from '@nestjs/swagger';
import { CreateExampleMessageDto } from './create-example-message.dto';

export class UpdateExampleMessageDto extends PartialType(CreateExampleMessageDto) {}
