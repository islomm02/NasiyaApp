import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetQueryDto } from 'src/sellers/dto/QueryDto';
import { addMonths } from 'date-fns';
import { DebtsStatus } from '@prisma/client';

@Injectable()
export class DebtService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateDebtDto, sellerId: string) {
    try {
      const monthly = Math.ceil(data.summaryAmount / data.term);
      const remaining = data.summaryAmount;
      const debter = await this.prisma.debters.findFirst({where: {id : data.debterId}})
      if(!debter){
        throw new NotFoundException("debter not found")
      }

      const startingTime = new Date();
      const nextPaymentDay = addMonths(startingTime, 1);

      const debt = await this.prisma.debt.create({
        data: {
          ...data,
          monthlyPayment: monthly,
          remainingAmount: remaining,
          remainingMonths: data.term,
          sellerId,
          startingTime,
          nextPaymentDay,
        },
      });

      return debt;
    } catch (error) {
      return { message: error.message };
    }
  }

  async overrude() {
    const overdueCount = await this.prisma.debt.count({
      where: {
        nextPaymentDay: {
          lt: new Date(),
        },
        status: {
          not: DebtsStatus.PAID,
        },
      },
    });
    return overdueCount
  }

  async findAll(query: GetQueryDto) {
    try {
      const { search, sortBy, order, page, limit } = query;
      const pageNumber = Number(page) || 1;
      const limitNumber = Number(limit) || 10;
      const skip = (pageNumber - 1) * limitNumber;

      const [data, total] = await this.prisma.$transaction([
        this.prisma.debt.findMany({
          where: search
            ? {
                name: {
                  contains: search,
                  mode: 'insensitive',
                },
              }
            : {},
          include: {
            debter: true,
          },
          // @ts-ignore
          orderBy: {
            [sortBy || 'name']: order === 'asc' ? 'asc' : 'desc',
          },
          skip,
          take: limitNumber,
        }),
        this.prisma.debt.count({
          where: search
            ? {
                name: {
                  contains: search,
                  mode: 'insensitive',
                },
              }
            : {},
        }),
      ]);

      return {
        total,
        page: pageNumber,
        limit: limitNumber,
        data,
      };
    } catch (error) {
      return { message: error.message };
    }
  }

  async findOne(id: string) {
    try {
      const first = await this.prisma.debt.findFirst({ where: { id } });
      return first;
    } catch (error) {
      return { message: error.message };
    }
  }

  async update(id: string, updateDebtDto: UpdateDebtDto) {
    try {
      const debt = await this.prisma.debt.findFirst({ where: { id } });
      if (!debt) {
        return { message: 'Debt With this Id not found', status: 404 };
      }
      const updated = await this.prisma.debt.update({
        where: { id },
        data: updateDebtDto,
      });
      return updated;
    } catch (error) {
      return { message: error.message };
    }
  }

  async remove(id: string) {
    try {
      const debt = await this.prisma.debt.findFirst({ where: { id } });
      if (!debt) {
        return { message: 'Debt With this Id not found', status: 404 };
      }
      const deleted = await this.prisma.debt.delete({ where: { id } });
      return deleted;
    } catch (error) {
      return { message: error.message };
    }
  }
}
