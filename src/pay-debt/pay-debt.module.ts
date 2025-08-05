import { Module } from '@nestjs/common';
import { PayDebtService } from './pay-debt.service';
import { PayDebtController } from './pay-debt.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PayDebtController],
  providers: [PayDebtService, PrismaService],
})
export class PayDebtModule {}
