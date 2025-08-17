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
    let chat = await this.prisma.chat.findFirst({ where: { sellerId: sellerId, debterId: data.debterId } });

    if(chat){
      throw new NotFoundException
    }

    const newChat = await this.prisma.chat.create({data: {...data, sellerId}, include: {sellers: true, debter: true}})

    return newChat
  } catch (error) {
    return { message: error.message };
  }
}



  async findAll(params: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    search?: string;
    debterId?: string;
    sellerId?: string;
    sellerIdToken?: string
  }) {
    const {
      page = 1,
      limit = 10,
      sortBy = "id",
      sortOrder = "desc",
      search = "",
      debterId,
      sellerId
    } = params;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { message: { hasSome: [search] } },
        { debter: { name: { contains: search, mode: "insensitive" } } },
        { sellers: { name: { contains: search, mode: "insensitive" } } }
      ];
    }

    if (debterId) where.debterId = debterId;
    if (sellerId) where.sellerId = sellerId;

    try {
      const chats = await this.prisma.chat.findMany({
        where,
        include: {
          debter: true,
          sellers: true
        },
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: limit
      });

      const total = await this.prisma.chat.count({ where });

      return {
        totalPages: Math.ceil(total / limit),
        total,
        page,
        limit,
        data: chats,
      };
    } catch (error) {
      return { message: error.message };
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

  async findMyChats(id: string) {
    try {
       const asd = await  this.prisma.chat.findMany({where: {sellerId : id}})
       return asd
    } catch (error) {
      return {message: error.message}
    }
  }

  async update(id: string, data: UpdateChatDto) {
    try {
       const asd = await  this.prisma.chat.findFirst({where: {id}})

       if(!asd){
        throw new NotFoundException
       }

       const updated = await this.prisma.chat.update({where: {id: asd.id}, data})
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
  
  
  async removeAll(id: string) {
    try {
       const asd = await  this.prisma.chat.findFirst({where: {id}})
       if(!asd){
        throw new NotFoundException("Chat not found")
       }
       await this.prisma.messages.deleteMany({where: {chatId: asd.id}})
       const deleted = await this.prisma.chat.delete({where: {id}})
       return deleted
    } catch (error) {
      return {message: error.message}
    }
  }
}
