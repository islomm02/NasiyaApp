import { Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RegionService {
  constructor(private prisma: PrismaService){}
  async create(createRegionDto: CreateRegionDto) {
    try {
      const region = await this.prisma.region.findFirst({where: {name: createRegionDto.name}})
      if(region){
        return {message: "Region with this name is already exists", status: 400}
      }
      const newRegion = await this.prisma.region.create({data: createRegionDto})
      return newRegion
    } catch (error) {
      return {message: error.message}
    }
  }

  async findAll() {
    try {
      const regions = await this.prisma.region.findMany()
      return regions
    } catch (error) {
      return {message: error.message}      
    }
  }

  async findOne(id: string) {
    try {
      const one = await this.prisma.region.findFirst({where: {id}})
      if(!one){
        return {message: "Region with this id not found", status: 404}
      }

      return one
    } catch (error) {
      return {message: error.message}
    }

  }

  async update(id: string, updateRegionDto: UpdateRegionDto) {
    try {
      const one = await this.prisma.region.findFirst({where: {id}})
      if(!one){
        return {message: "User with this id not found", status: 404}
      }
      const updated = await this.prisma.region.update({where: {id}, data: updateRegionDto})
      return updated
    } catch (error) {
      return {message: error.message}      
    }
  }
  
  async remove(id: string) {
    try {
      const one = await this.prisma.region.findFirst({where: {id}})
      if(!one){
        return {message: "User with this id not found", status: 404}
      }
      const deleted = await this.prisma.region.delete({where: {id}})
      return deleted
    } catch (error) {
      return {message: error.message} 
    }
  }
}
