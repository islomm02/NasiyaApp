import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { GetQueryDto } from './dto/QueryDto';
import { SellerType } from 'src/types';
@Injectable()
export class SellersService {
  constructor(private prisma: PrismaService) {}

  async getMe(id) {
    try {
      const user = await this.prisma.sellers.findFirst({ where: { id } });
      return user;
    } catch (error) {
      return { message: error.message };
    }
  }

  async create(createSellerDto: CreateSellerDto) {
    try {
      let user = await this.prisma.sellers.findFirst({
        where: { login: createSellerDto.login },
      });
      if (user) {
        return {
          message: 'User with this username already exists',
          status: 400,
        };
      }
      user = null;
      user = await this.prisma.sellers.findFirst({
        where: { email: createSellerDto.email },
      });
      if (user) {
        return { message: 'User with this email already exists', status: 400 };
      }
      const hash = bcrypt.hashSync(createSellerDto.password, 10);
      const newUser: SellerType = await this.prisma.sellers.create({
        data: { ...createSellerDto, password: hash },
      });
      return newUser;
    } catch (error) {
      return { message: error.message };
    }
  }

  async findAll(query: GetQueryDto) {
    try {
      const { search, sortBy, order, page, limit } = query;
      const pageNumber = Number(page) || 1;
      const limitNumber = Number(limit) || 10;
      const skip = (pageNumber - 1) * limitNumber;

      const [data, total] = await this.prisma.$transaction([
        this.prisma.sellers.findMany({
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
          include: {
            debters: true
          }
        }),
        this.prisma.sellers.count({
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
        page,
        limit,
        data,
      };
    } catch (error) {
      return { message: error.message };
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.prisma.sellers.findFirst({ where: { id } });
      if (!user) {
        throw new NotFoundException('Seller not found');
      }
      return user;
    } catch (error) {
      return { message: error.message };
    }
  }

  async update(id: string, updateSellerDto: UpdateSellerDto) {
    try {
      const user = await this.prisma.sellers.findFirst({ where: { id } });
      if (!user) {
        throw new NotFoundException('Seller not found');
      }
      const updated = await this.prisma.sellers.update({
        where: { id },
        data: updateSellerDto,
      });
      return updated;
    } catch (error) {
      return { message: error.message };
    }
  }

  async remove(id: string) {
    try {
      const user = await this.prisma.sellers.findFirst({ where: { id } });
      if (!user) {
        throw new NotFoundException('Seller not found');
      }
      const deleted = await this.prisma.sellers.delete({ where: { id } });
      return deleted;
    } catch (error) {
      return { message: error.message };
    }
  }
}
