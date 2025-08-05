import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {

  constructor(private prisma:PrismaService){}

  async create(data: CreateChatDto, sellerId: string) {
    try {
      const chat = await this.prisma.chat.create({data: {...data, sellerId}})
      return chat
    } catch (error) {
        return {message: error.message}      
    }
  }

  async findAll() {
    try {
      const chats = await this.prisma.chat.findMany()
      return chats
    } catch (error) {
        return {message: error.message}      
    }
  }

  async findOne(id: string) {
    try {
       const asd = await  this.prisma.chat.findFirst({where: {id}})
       return asd
    } catch (error) {
      return {message: error.message}
    }
  }

  async update(id: string, data: UpdateChatDto) {
    try {
       const asd = await  this.prisma.chat.findFirst({where: {id}})
       if(!asd){
        throw new NotFoundException("Chat not found")
       }
       const updated = await this.prisma.chat.update({where: {id}, data})
       return updated
    } catch (error) {
      return {message: error.message}
    }
  }

  async remove(id: string) {
    try {
       const asd = await  this.prisma.chat.findFirst({where: {id}})
       if(!asd){
        throw new NotFoundException("Chat not found")
       }
       const deleted = await this.prisma.chat.delete({where: {id}})
       return deleted
    } catch (error) {
      return {message: error.message}
    }
  }
}
