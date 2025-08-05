import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreatePayDebtDto,
} from './dto/create-pay-debt.dto';
import { UpdatePayDebtDto } from './dto/update-pay-debt.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetQueryDto } from 'src/sellers/dto/QueryDto';
import { DebtsStatus } from '@prisma/client';
import { retry } from 'rxjs';

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
        }
        if (debt.remainingMonths) {
          if (createPayDebtDto.month < debt.remainingMonths) {
            newOptions.remainingAmount =
              debt.remainingAmount - debt.remainingMonths * debt.monthlyPayment;
            newOptions.remainingMonths =
              debt.remainingMonths - createPayDebtDto.month;
          }
        }
      }
      const updated = await this.prisma.debt.update({
        where: { id: createPayDebtDto.debtId },
        data: newOptions,
      });
      return updated;
    } catch (error) {
      return {message: error.message}

    }
  }

  async payAll(debtId: string) {
    try {
      const newOptions: any = {};
      newOptions.status = DebtsStatus.PAID;
      newOptions.remainingMonths = 0;
      newOptions.remainingAmount = 0;
      const debt = await this.prisma.debt.findFirst({where: {id: debtId}})
      if(!debt){
        throw new NotFoundException("Debt not found")
      }
      const updated = await this.prisma.debt.update({where: {id: debtId}, data: newOptions})
      return updated
    } catch (error) {
      return {message: error.message}
    }
  }

  async findAll(query: GetQueryDto) {
    try {
      // const
    } catch (error) {}
    return `This action returns all payDebt`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payDebt`;
  }

  update(id: number, updatePayDebtDto: UpdatePayDebtDto) {
    return `This action updates a #${id} payDebt`;
  }

  remove(id: number) {
    return `This action removes a #${id} payDebt`;
  }
}
