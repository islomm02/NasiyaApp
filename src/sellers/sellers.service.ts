import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcrypt"
@Injectable()
export class SellersService {
  
  constructor(private prisma: PrismaService){}

  async getMe(id){
    try {
      const user = await this.prisma.sellers.findFirst({where: {id}})
    return user
    } catch (error) {
      return {message: error.message}
    }
  }
  
  
  async create(createSellerDto: CreateSellerDto) {
    try {
      let user = await this.prisma.sellers.findFirst({where: {login: createSellerDto.login}})
      if(user){
        return {message: "User with this username already exists", status: 400}
      }
      user = null
      user = await this.prisma.sellers.findFirst({where: {email: createSellerDto.email}})
      if(user){
        return {message: "User with this email already exists", status: 400}
      }
      const hash = bcrypt.hashSync(createSellerDto.password, 10)
      const newUser = await this.prisma.sellers.create({data: {...createSellerDto, password: hash}})
      return newUser
    } catch (error) {
      return {message: error.message}
    }
  }

  async findAll() {
    try {
      const sellers = await this.prisma.sellers.findMany()
      return sellers
    } catch (error) {
      return {message: error.message}
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.prisma.sellers.findFirst({where: {id}})
      if(!user){
        NotFoundException
      }
      return user
    } catch (error) {
      return {message: error.message}      
    }
  }

  async update(id: string, updateSellerDto: UpdateSellerDto) {
    try {
      const user = await this.prisma.sellers.findFirst({where: {id}})
      if(!user){
        NotFoundException
      }
      const updated = await this.prisma.sellers.update({where: {id}, data: updateSellerDto})
      return updated
    } catch (error) {
        return {message: error.message}      
    }
  }

  async remove(id: string) {
    try {
      const user = await this.prisma.sellers.findFirst({where: {id}})
      if(!user){
        NotFoundException
      }
      const deleted = await this.prisma.sellers.delete({where: {id}})
      return deleted
    } catch (error) {
        return {message: error.message}      
    }
  }
}
