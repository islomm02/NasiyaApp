import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FaqService {

  constructor(private prisma: PrismaService){}

  async create(data: CreateFaqDto) {
    try {
      const created = await this.prisma.fAQ.create({data})
      return created
    } catch (error) {
      return {message : error.message}
    }
  }

  async findAll() {
    try {
      const faqs = await this.prisma.fAQ.findMany()
      return faqs
    } catch (error) {
        return {message: error.message}      
    }
  }

  async findOne(id: string) {
    try {
      const one = await this.prisma.fAQ.findFirst({where: {id}})
      if(!one){
        throw new NotFoundException
      }
      return one
    } catch (error) {
      return {message: error.message}
    }
  }

  async update(id: string, data: UpdateFaqDto) {
    try {
      const one = await this.prisma.fAQ.findFirst({where: {id}})
      if(!one){
        throw new NotFoundException
      }
      const updated = await this.prisma.fAQ.update({where: {id}, data})
      return updated
    } catch (error) {
      return {message: error.message}
    }
  }

  async remove(id: string) {
    try {
      const one = await this.prisma.fAQ.findFirst({where: {id}})
      if(!one){
        throw new NotFoundException
      }
      const deleted = await this.prisma.fAQ.delete({where: {id}})
      return deleted
    } catch (error) {
      return {message: error.message}
    }
  }
}
