import { Injectable } from '@nestjs/common';
import { CreateCommonDto } from './dto/create-common.dto';
import { UpdateCommonDto } from './dto/update-common.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommonService {
  constructor(private prisma: PrismaService){}
  
  findAll() {
    return `This action returns all common`;
  }
  
  async findAllDebts(sellerId: string) {
  const debts = await this.prisma.debt.findMany({where: {sellerId}});
  const totalSummaryAmount = debts.reduce((sum, debt) => {
    return sum + (debt.summaryAmount || 0);
  }, 0);

  return totalSummaryAmount
}

}
