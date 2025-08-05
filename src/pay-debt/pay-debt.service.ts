import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePayDebtDto } from './dto/create-pay-debt.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { DebtsStatus } from '@prisma/client';
import { addMonths } from 'date-fns';

@Injectable()
export class PayDebtService {
  constructor(private prisma: PrismaService) {}

  async create(createPayDebtDto: CreatePayDebtDto) {
    try {
      const debt = await this.prisma.debt.findFirst({
        where: { id: createPayDebtDto.debtId },
      });

      if (!debt) {
        throw new NotFoundException('Debt Not found');
      }

      const newOptions: any = {};

      if (debt) {
        if (createPayDebtDto.month == debt.remainingMonths) {
          newOptions.status = DebtsStatus.PAID;
          newOptions.remainingMonths = 0;
          newOptions.remainingAmount = 0;
          newOptions.nextPaymentDay = null;
        } else if (
          debt.remainingMonths &&
          createPayDebtDto.month < debt.remainingMonths
        ) {
          newOptions.remainingAmount =
            debt.remainingAmount - createPayDebtDto.month * debt.monthlyPayment;

          newOptions.remainingMonths =
            debt.remainingMonths - createPayDebtDto.month;

          const prevNext = debt.nextPaymentDay
            ? new Date(debt.nextPaymentDay)
            : new Date();
          newOptions.nextPaymentDay = addMonths(prevNext, 1);
        }
      }

      const updated = await this.prisma.debt.update({
        where: { id: createPayDebtDto.debtId },
        data: newOptions,
      });

      return updated;
    } catch (error) {
      return { message: error.message };
    }
  }

  async payAll(debtId: string) {
    try {
      const debt = await this.prisma.debt.findFirst({ where: { id: debtId } });
      if (!debt) {
        throw new NotFoundException('Debt not found');
      }

      const newOptions: any = {
        status: DebtsStatus.PAID,
        remainingMonths: 0,
        remainingAmount: 0,
        nextPaymentDay: null, // to‘liq to‘lov bo‘lgani uchun
      };

      const updated = await this.prisma.debt.update({
        where: { id: debtId },
        data: newOptions,
      });

      return updated;
    } catch (error) {
      return { message: error.message };
    }
  }
}
