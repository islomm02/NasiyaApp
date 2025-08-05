import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExampleMessageDto } from './dto/create-example-message.dto';
import { UpdateExampleMessageDto } from './dto/update-example-message.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundError } from 'rxjs';

@Injectable()
export class ExampleMessagesService {

  constructor(private prisma: PrismaService){}

  async create(sellerId: string, data: CreateExampleMessageDto) {
    try {
      const msg = await this.prisma.exampleMessages.create({data: {...data, sellerId}})
      return msg
    } catch (error) {
      return {message: error.message}
    }
  }

  async findAll() {
    try {
      const msgs = await this.prisma.exampleMessages.findMany()
      return msgs
    } catch (error) {
      return {message: error.message}  
    }
  }

  async findOne(id: string) {
    try {
      const msg = await this.prisma.exampleMessages.findFirst({where: {id}})
      if(!msg){
        throw new NotFoundException
      }
      return msg
    } catch (error) {
      return {message:error.message}
    }
  }

  async update(id: string, data: UpdateExampleMessageDto) {
    try {
      const msg = await this.prisma.exampleMessages.findFirst({where: {id}})
      if(!msg){
        throw new NotFoundException
      }
      const updated = await this.prisma.exampleMessages.update({where: {id}, data})
      return updated
    } catch (error) {
        return {message: error.message}      
    }
  }

  async remove(id: string) {
    try {
      const one = await this.prisma.exampleMessages.findFirst({where: {id}})
      if(!one){
        throw new NotFoundException
      }
      const deleted = await this.prisma.exampleMessages.delete({where: {id}})
      return deleted
    } catch (error) {
      return {message: error.message}
    }
  }
}
