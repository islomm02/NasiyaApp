import { Injectable } from '@nestjs/common';
import { CreateImagesDebtDto } from './dto/create-images-debt.dto';
import { UpdateImagesDebtDto } from './dto/update-images-debt.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateImagesClientDto } from 'src/images-client/dto/create-images-client.dto';

@Injectable()
export class ImagesDebtService {
  constructor(private prisma: PrismaService){}
  
    async create(data: CreateImagesDebtDto) {
      try {
        const newImg = await this.prisma.imagesOfDebts.create({data})
        return newImg
      } catch (error) {
        return{message: error.message}
      }
    }

  async findOne(id: string) {
    try {
      const img = await this.prisma.imagesOfDebts.findFirst({where: {id}})
      return img
    } catch (error) {
      
    }
    return `This action returns a #${id} imagesDebt`;
  }

  update(id: number, updateImagesDebtDto: UpdateImagesDebtDto) {
    return `This action updates a #${id} imagesDebt`;
  }

  remove(id: number) {
    return `This action removes a #${id} imagesDebt`;
  }
}
