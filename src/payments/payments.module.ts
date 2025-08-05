import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { DebtService } from 'src/debt/debt.service';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, PrismaService, DebtService],
})
export class PaymentsModule {}
