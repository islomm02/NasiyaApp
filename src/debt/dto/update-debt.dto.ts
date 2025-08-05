import { PartialType } from '@nestjs/mapped-types';
import { CreateDebtDto } from './create-debt.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDebtDto extends PartialType(CreateDebtDto) {}
