import { Module } from '@nestjs/common';
import { ImagesClientService } from './images-client.service';
import { ImagesClientController } from './images-client.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ImagesClientController],
  providers: [ImagesClientService, PrismaService],
})
export class ImagesClientModule {}
