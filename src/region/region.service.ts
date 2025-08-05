import { Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetQueryDto } from 'src/sellers/dto/QueryDto';

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

  async findAll(query: GetQueryDto) {
  try {
    const { search, sortBy, order, page, limit } = query;
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.region.findMany({
        where: search
          ? {
              name: {
                contains: search,
                mode: 'insensitive',
              },
            }
          : {},
        // @ts-ignore
        orderBy: {
          [sortBy || 'name']: order === 'asc' ? 'asc' : 'desc',
        },
        skip,
        take: limitNumber,
      }),
      this.prisma.region.count({
        where: search
          ? {
              name: {
                contains: search,
                mode: 'insensitive',
              },
            }
          : {},
      }),
    ]);

    return {
      total,
      page: pageNumber,
      limit: limitNumber,
      data,
    };
  } catch (error) {
    return { message: error.message };
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
