import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreatePayDebtDto,
  CreatePayDebtDtoAny,
} from './dto/create-pay-debt.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { DebtsStatus } from '@prisma/client';
import { addMonths } from 'date-fns';
import { daysInWeek } from 'date-fns/constants';

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

      const monthValue = debt?.remainingMonths ?? 0;

      await this.prisma.payments.create({
        data: {
          month: monthValue,
          debt: { connect: { id: debt.id } },
        },
      });

      return updated;
    } catch (error) {
      return { message: error.message };
    }
  }

  async createAny(createPayDebtDto: CreatePayDebtDtoAny) {
    try {
      const debt = await this.prisma.debt.findFirst({
        where: { id: createPayDebtDto.debtId },
      });

      if (!debt) {
        throw new NotFoundException('Debt Not found');
      }

      const newOptions: any = {};

      if (createPayDebtDto.amount && createPayDebtDto.amount > 0) {
        const newRemainingAmount =
          debt.remainingAmount - createPayDebtDto.amount;

        if (newRemainingAmount <= 0) {
          newOptions.status = DebtsStatus.PAID;
          newOptions.remainingMonths = 0;
          newOptions.remainingAmount = 0;
          newOptions.monthlyPayment = 0;
          newOptions.nextPaymentDay = null;
        } else {
          const monthsLeft = Math.max(
            1,
            Math.ceil(newRemainingAmount / debt.monthlyPayment),
          );

          newOptions.remainingAmount = newRemainingAmount;
          newOptions.remainingMonths = monthsLeft;

          newOptions.monthlyPayment = Number(
            (newRemainingAmount / monthsLeft).toFixed(2),
          );

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

      const monthValue = debt?.remainingMonths ?? 0;

      await this.prisma.payments.create({
        data: {
          month: monthValue,
          debt: { connect: { id: debt.id } },
        },
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
        monthlyPayment: 0,
        nextPaymentDay: null,
      };

      const updated = await this.prisma.debt.update({
        where: { id: debtId },
        data: newOptions,
      });

      const monthValue = debt?.remainingMonths ?? 0;

      await this.prisma.payments.create({
        data: {
          month: monthValue,
          debt: { connect: { id: debt.id } },
        },
      });

      return updated;
    } catch (error) {
      return { message: error.message };
    }
  }
}
