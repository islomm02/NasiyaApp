import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateTermDto } from './dto/create-term.dto';
import { UpdateTermDto } from './dto/update-term.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetQueryDto } from 'src/sellers/dto/QueryDto';

@Injectable()
export class TermsService {
  constructor(private prisma: PrismaService) {}

  async create(createTermDto: CreateTermDto) {
    try {
      const term = await this.prisma.terms.create({
        data: createTermDto,
      });
      return term;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(query: GetQueryDto) {
  try {
    const { search, sortBy, order, page, limit } = query;
    const pageNumber = Number(page) || 1;
    const limitNumber = limit ? Number(limit) : null;
    const skip = limitNumber ? (pageNumber - 1) * limitNumber : undefined;

    // Ruxsat berilgan ustunlar (xavfsizlik uchun)
    const validSortFields = ["term", "createdAt", "updatedAt"];
    const sortField = "term";

    const [data, total] = await this.prisma.$transaction([
      this.prisma.terms.findMany({
        where: search
          ? {
              term: {
                contains: search,
                mode: "insensitive",
              },
            }
          : {},
        orderBy: {
          [sortField]: order === "asc" ? "asc" : "desc",
        },
        skip,
        take: limitNumber || undefined, 
      }),
      this.prisma.terms.count({
        where: search
          ? {
              term: {
                contains: search,
                mode: "insensitive",
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
      const term = await this.prisma.terms.findUnique({
        where: { id },
      });
      if (!term) {
        throw new NotFoundException('Term not found');
      }
      return term;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, updateTermDto: UpdateTermDto) {
    try {
      const exists = await this.prisma.terms.findUnique({ where: { id } });
      if (!exists) {
        throw new NotFoundException(' term not found');
      }

      return await this.prisma.terms.update({
        where: { id },
        data: updateTermDto,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const exists = await this.prisma.terms.findUnique({ where: { id } });
      if (!exists) {
        throw new NotFoundException(' term not found');
      }

      return await this.prisma.terms.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
