import { Module } from '@nestjs/common';
import { ImagesDebtService } from './images-debt.service';
import { ImagesDebtController } from './images-debt.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ImagesDebtController],
  providers: [ImagesDebtService, PrismaService],
})
export class ImagesDebtModule {}
