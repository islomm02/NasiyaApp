import { Module } from '@nestjs/common';
import { DebterService } from './debter.service';
import { DebterController } from './debter.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DebterController],
  providers: [DebterService, PrismaService],
})
export class DebterModule {}
