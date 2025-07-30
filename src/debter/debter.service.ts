import { Injectable } from '@nestjs/common';
import { CreateDebterDto } from './dto/create-debter.dto';
import { UpdateDebterDto } from './dto/update-debter.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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

  async findAll() {
    try {
      const debters = await this.prisma.debters.findMany()
      return debters
    } catch (error) {
      return {message: error.message}      
    }
  }

  async findOne(id: string) {
    try {
      const debter = await this.prisma.debters.findFirst({where: {id}})
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
    try {
      const debter = await this.prisma.debters.findFirst({where: {id}})
      if(!debter){
        return {message: "Debter with this id not found", status: 404}
      }
      const deleted = await this.prisma.debters.delete({where: {id}})
      return deleted
    } catch (error) {
      return {message: error.message}
    }
  }
}
