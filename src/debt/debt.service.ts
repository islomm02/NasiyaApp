import { Injectable } from '@nestjs/common';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { retry } from 'rxjs';

@Injectable()
export class DebtService {
  constructor(private prisma: PrismaService){}
  async create(createDebtDto: CreateDebtDto) {
    try {
      const debt = await this.prisma.debt.create({data: createDebtDto})
      return debt
    } catch (error) {
      return {message: error.message}
    }
  }

  async findAll() {
    try {
      const debts = await this.prisma.debt.findMany()
      return debts
    } catch (error) {
        return {message: error.message}      
    }
  }

  async findOne(id: string) {
    try {
      const first = await this.prisma.debt.findFirst({where: {id}})
      return first
    } catch (error) {
      return {message: error.message}
    }
  }

  async update(id: string, updateDebtDto: UpdateDebtDto) {
    try {
      const debt = await this.prisma.debt.findFirst({where: {id}})
      if(!debt){
        return {message: "Debt With this Id not found", status: 404}
      }
      const updated = await this.prisma.debt.update({where: {id}, data: updateDebtDto})
      return updated
    } catch (error) {
      return {message: error.message}
    }
  }

  async remove(id: string) {
    try {
      const debt = await this.prisma.debt.findFirst({where: {id}})
      if(!debt){
        return {message: "Debt With this Id not found", status: 404}
      }
      const deleted = await this.prisma.debt.delete({where: {id}})
      return deleted
    } catch (error) {
      return {message: error.message}
    }
  }
}
