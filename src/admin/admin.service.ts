import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcrypt"
@Injectable()
export class AdminService {

  constructor(private prisma: PrismaService){}

  
  async create(data: CreateAdminDto) {
    try {
      const admin = await this.prisma.admin.findFirst({where: {username: data.username}})
      if(admin){
        return {message: "Admin with this phone already exists"}
      }
      const hash = bcrypt.hashSync(data.password, 10)
      const newAdmin = await this.prisma.admin.create({data: {...data, password: hash}})
      return newAdmin
    } catch (error) {
      return {message: error.message}  
    }
    
  }

  async findAll() {
    try {
      const admins = await this.prisma.admin.findMany()
      return admins
    } catch (error) {
      return {message: error.message}      
    }
  }

  async findOne(id: string) {
    try {
      const admin = await this.prisma.admin.findFirst({where: {id}})
      if(!admin){
        NotFoundException
      }
      return admin
    } catch (error) {
      return {message: error.message}      
    }
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    try {
      const admin = await this.prisma.admin.findFirst({where: {id}})
      if(!admin){
        NotFoundException
      }
      const updated = await this.prisma.admin.update({where: {id}, data: updateAdminDto})
      return updated
    } catch (error) {
      return {message: error.message}
    }
  }
  
  async remove(id: string) {
    try {
      const admin = await this.prisma.admin.findFirst({where: {id}})
      if(!admin){
        NotFoundException
      }
      const deleted = await this.prisma.admin.delete({where: {id}})
      return deleted 
    } catch (error) {
    return {message: error.message}
  }  
  }
}
