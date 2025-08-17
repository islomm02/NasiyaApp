import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService){}
  async create(data: CreateMessageDto) {
    try {
      const chat = await this.prisma.chat.findFirst({where: {id: data.chatId}})
      if(!chat){
        throw new NotFoundException
      }
      const message = await this.prisma.messages.create({data: {...data, debterId: chat?.debterId}})
      return message
    } catch (error) {
      return {message: error.message}
    }
  }

  async findAll(chatId?: string) {
  try {
    
    if (chatId) {
      const messages = await this.prisma.messages.findMany({where: {chatId}, orderBy: { createdAt: 'asc' }, })
      return messages
    }else{
      return null
    }
  } catch (error) {
    return { message: error.message };
  }
}


 async findOne(id: string) {
  const one = await this.prisma.messages.findFirst({where: {id}})  
  if(!one){
    throw new NotFoundException
  }
  return one
  }

 async update(id: string, data: UpdateMessageDto) {
  try {
    const one = await this.prisma.messages.findFirst({where: {id}})
    if(!one){
      throw new NotFoundException
    }
    const updated = await this.prisma.messages.update({where: {id}, data})
    return updated
  } catch (error) {
    return {message: error.message}
  }  
  }

  async remove(id: string) {
    try {
      const one = await this.prisma.messages.findFirst({where: {id}})
    if(!one){
      throw new NotFoundException
    }
    const deleted = await this.prisma.messages.delete({where: {id}})
    return deleted 
    } catch (error) {
          return {message: error.message}

    }
  }
}
