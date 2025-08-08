import { Injectable } from '@nestjs/common';
import { CreateImagesDebtDto } from './dto/create-images-debt.dto';
import { UpdateImagesDebtDto } from './dto/update-images-debt.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateImagesClientDto } from 'src/images-client/dto/create-images-client.dto';
import { log } from 'console';

@Injectable()
export class ImagesDebtService {
  constructor(private prisma: PrismaService){}
  
    async create(data: CreateImagesDebtDto) {
  try {
    const oldImgs = await this.prisma.imagesOfDebts.findFirst({
      where: { debtId: data.debtId }
    });

    // Eski rasm(lar)ni olish, massiv emas bo‘lsa, massivga aylantiramiz
    const existingImages = Array.isArray(oldImgs?.image)
      ? oldImgs.image
      : oldImgs?.image ? [oldImgs.image] : [];

    // Yangi rasmni qo‘shamiz
    const updatedImages = [...existingImages, data.image[0]];

    console.log("Yangi rasm ro‘yxati:", updatedImages);

    // Yangi yozuv yaratamiz
    const newImg = await this.prisma.imagesOfDebts.create({
      data: {
        debtId: data.debtId,
        image: updatedImages
      }
    });

    return newImg;

  } catch (error) {
    return { message: error.message };
  }
}


 async findOne(id: string) {
  try {
    const img = await this.prisma.imagesOfDebts.findFirst({ where: { debtId: id } });
    
    if (!img) {
      return { message: 'Image not found' };
    }

    return img;
  } catch (error) {
    return { message: error instanceof Error ? error.message : 'Unknown error' };
  }
}


  update(id: number, updateImagesDebtDto: UpdateImagesDebtDto) {
    return `This action updates a #${id} imagesDebt`;
  }

  remove(id: number) {
    return `This action removes a #${id} imagesDebt`;
  }
}
