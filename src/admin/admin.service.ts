import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { GetQueryDto } from 'src/sellers/dto/QueryDto';
@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAdminDto) {
    try {
      const admin = await this.prisma.admin.findFirst({
        where: { username: data.username },
      });
      if (admin) {
        return { message: 'Admin with this phone already exists' };
      }
      const hash = bcrypt.hashSync(data.password, 10);
      const newAdmin = await this.prisma.admin.create({
        data: { ...data, password: hash },
      });
      return newAdmin;
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
        this.prisma.admin.findMany({
          where: search
            ? {
                username: {
                  contains: search,
                  mode: 'insensitive',
                },
              }
            : {},
          // @ts-ignore
          orderBy: {
            [sortBy || 'username']: order === 'asc' ? 'asc' : 'desc',
          },
          skip,
          take: limitNumber,
        }),
        this.prisma.admin.count({
          where: search
            ? {
              OR:[
                {
                username: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                username: {
                  contains: search,
                  mode: 'insensitive',
                },
              }
              ]
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
      const admin = await this.prisma.admin.findFirst({ where: { id } });
      if (!admin) {
        throw new NotFoundException('Admin with this id not found');
      }
      return admin;
    } catch (error) {
      return { message: error.message };
    }
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    try {
      const admin = await this.prisma.admin.findFirst({ where: { id } });
      if (!admin) {
        throw new NotFoundException('Admin with this id not found');
      }
      const updated = await this.prisma.admin.update({
        where: { id },
        data: updateAdminDto,
      });
      return updated;
    } catch (error) {
      return { message: error.message };
    }
  }

  async remove(id: string) {
    try {
      const admin = await this.prisma.admin.findFirst({ where: { id } });
      if (!admin) {
        throw new NotFoundException('Admin with this id not found');
      }
      const deleted = await this.prisma.admin.delete({ where: { id } });
      return deleted;
    } catch (error) {
      return { message: error.message };
    }
  }
}
