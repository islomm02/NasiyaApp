import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ExampleMessagesService } from './example-messages.service';
import { CreateExampleMessageDto } from './dto/create-example-message.dto';
import { UpdateExampleMessageDto } from './dto/update-example-message.dto';
import { RoleD } from 'src/decorator/role-decorators';
import { UsersRole } from '@prisma/client';
import { RoleGuard } from 'src/guards/role.guard';
import { TokenGuard } from 'src/guards/token.guard';

@Controller('example-messages')
export class ExampleMessagesController {
  constructor(private readonly exampleMessagesService: ExampleMessagesService) {}


  @RoleD(UsersRole.ADMIN, UsersRole.SELLER)
  @UseGuards(RoleGuard)
  @UseGuards(TokenGuard)
  @Post()
  create(@Body() createExampleMessageDto: CreateExampleMessageDto, @Request() req) {
    return this.exampleMessagesService.create(req.user.id, createExampleMessageDto);
  }

  @Get()
  findAll() {
    return this.exampleMessagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exampleMessagesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExampleMessageDto: UpdateExampleMessageDto) {
    return this.exampleMessagesService.update(id, updateExampleMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exampleMessagesService.remove(id);
  }
}
