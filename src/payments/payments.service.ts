import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { DebtService } from 'src/debt/debt.service';
import { CreateDebtDto } from 'src/debt/dto/create-debt.dto';
import { DebtType } from 'src/types';
import { DebtsStatus } from '@prisma/client';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService, private debtService: DebtService){}
  async create(data: CreatePaymentDto) {
    try {
      const isPaid = await this.prisma.payments.findFirst({where: {debtId: data.debtId, month: data.month}})
      if(isPaid){
        return {message: "Ushbu oy uchun tolov qilingan", status: 200}
      }

      // @ts-ignore
      const lastDebt:DebtType = await this.debtService.findOne(data.debtId)
      const newDebtOptions = {
        remainingMonths: lastDebt?.remainingMonths - data.month,
        remainingAmount: lastDebt.remainingAmount - lastDebt.monthlyPayment,
        status: lastDebt.remainingMonths - data.month == 0 ? DebtsStatus.PAID : DebtsStatus.NOT_PAID
      }
      if(lastDebt.remainingMonths - data.month == 0){
        newDebtOptions.status = DebtsStatus.PAID
      }
      await this.debtService.update(data.debtId, newDebtOptions)
      const payment = await this.prisma.payments.create({data})
      return payment
    } catch (error) {
      return {message: error.message}
    }
  }

  async findAll() {
    try {
      const payments = await this.prisma.payments.findMany()
      return payments
    } catch (error) {
      return {message: error.message}
    }
  }

  async findOne(id: string) {
    try {
      const paymnt = await this.prisma.payments.findFirst({where: {id}})
      return paymnt
    } catch (error) {
      return {message: error.message}
    }
  }

  async update(id: string, data: UpdatePaymentDto) {
    try {
      const paymnt = await this.prisma.payments.findFirst({where: {id}})
      if(!paymnt){
        throw new NotFoundException("Payment not found")
      }
      const updated = await this.prisma.payments.update({where: {id}, data})
      return updated
    } catch (error) {
      return {message: error.message}
    }
  }

  async remove(id: string) {
    try {
      const paymnt = await this.prisma.payments.findFirst({where: {id}})
      if(!paymnt){
        throw new NotFoundException("Payment not found")
      }
      const deleted = await this.prisma.payments.delete({where: {id}})
      return deleted
    } catch (error) {
      return {message: error.message}      
    }
  }
}
