import { Module } from '@nestjs/common';
import { ExampleMessagesService } from './example-messages.service';
import { ExampleMessagesController } from './example-messages.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ExampleMessagesController],
  providers: [ExampleMessagesService, PrismaService],
})
export class ExampleMessagesModule {}
