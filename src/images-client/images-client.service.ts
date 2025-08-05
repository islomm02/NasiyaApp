import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateImagesClientDto } from './dto/create-images-client.dto';
import { UpdateImagesClientDto } from './dto/update-images-client.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ImagesClientService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateImagesClientDto) {
    try {
      const newImg = await this.prisma.imagesOfDebters.create({ data });
      return newImg;
    } catch (error) {
      return { message: error.message };
    }
  }

  async findOne(debterId: string) {
    try {
      const img = await this.prisma.imagesOfDebters.findFirst({
        where: { debterId },
      });
      if(img){
        return img;
      }else{
        throw new NotFoundException("Image not found")
      }
    } catch (error) {
      return { message: error.message , status: 404};
    }
  }

  async update(id: string, data: UpdateImagesClientDto) {
    try {
      const updated = await this.prisma.imagesOfDebters.update({
        where: { id },
        data,
      });
      return data;
    } catch (error) {
      return { message: error.message };
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.prisma.imagesOfDebters.delete({
        where: { id },
      });
      return deleted;
    } catch (error) {
      return { message: error.message };
    }
  }
}
