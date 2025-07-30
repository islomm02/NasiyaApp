import { PartialType } from '@nestjs/swagger';
import { LoginSellerDto } from './create-auth.dto';

export class UpdateAuthDto extends PartialType(LoginSellerDto) {}
