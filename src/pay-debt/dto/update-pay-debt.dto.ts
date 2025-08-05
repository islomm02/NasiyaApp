import { PartialType } from '@nestjs/swagger';
import { CreatePayDebtDto } from './create-pay-debt.dto';

export class UpdatePayDebtDto extends PartialType(CreatePayDebtDto) {}
