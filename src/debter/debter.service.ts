import { Injectable } from '@nestjs/common';
import { CreateDebterDto } from './dto/create-debter.dto';
import { UpdateDebterDto } from './dto/update-debter.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetQueryDto } from 'src/sellers/dto/QueryDto';

@Injectable()
export class DebterService {
    constructor(private prisma: PrismaService){}
  
  async create(createDebterDto: CreateDebterDto, sellerId: string) {
    try {
      const debter = await this.prisma.debters.create({data: {...createDebterDto, sellerId: sellerId} })
      return debter
    } catch (error) {
      return {message: error.message}
    }
  }

  async findAll(query: GetQueryDto) {
  try {
    const { search, sortBy, order, page, limit } = query;
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.debters.findMany({
        include: {
          debts: true
        },
        where: search
          ? {
              name: {
                contains: search,
                mode: 'insensitive',
              },
            }
          : {},
        // @ts-ignore
        orderBy: {
          [sortBy || 'name']: order === 'asc' ? 'asc' : 'desc',
        },
        skip,
        take: limitNumber,
      }),
      this.prisma.debters.count({
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
      const debter = await this.prisma.debters.findFirst({where: {id}, include: {debts: true}})
      return debter
    } catch (error) {
      return {message: error.message}      
    }
  }

  async update(id: string, updateDebterDto: UpdateDebterDto) {
    try {
      const debter = await this.prisma.debters.findFirst({where: {id}})
      if(!debter){
        return {message: "Debter with this id not found", status: 404}
      }
      const updated = await this.prisma.debters.update({where: {id}, data: updateDebterDto})
      return updated
    } catch (error) {
      return {message: error.message}
    }
  }

 async remove(id: string) {
  await this.prisma.imagesOfDebters.deleteMany({
    where: { debterId: id }
  });

  await this.prisma.debt.deleteMany({
    where: { debterId: id }
  });

  return this.prisma.debters.delete({
    where: { id }
  });
}

}
