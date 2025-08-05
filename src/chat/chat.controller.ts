import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { RoleD } from 'src/decorator/role-decorators';
import { UsersRole } from '@prisma/client';
import { RoleGuard } from 'src/guards/role.guard';
import { TokenGuard } from 'src/guards/token.guard';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @RoleD(UsersRole.ADMIN, UsersRole.SELLER)
  @UseGuards(RoleGuard)
  @UseGuards(TokenGuard)
  @Post()
  create(@Body() createChatDto: CreateChatDto, @Request() req) {
    return this.chatService.create(createChatDto, req.user.id);
  }

  @RoleD(UsersRole.ADMIN, UsersRole.SELLER)
  @UseGuards(RoleGuard)
  @UseGuards(TokenGuard)
  @Get()
  findAll() {
    return this.chatService.findAll();
  }

  @RoleD(UsersRole.ADMIN, UsersRole.SELLER)
  @UseGuards(RoleGuard)
  @UseGuards(TokenGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(id);
  }

  @RoleD(UsersRole.ADMIN, UsersRole.SELLER)
  @UseGuards(RoleGuard)
  @UseGuards(TokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatService.update(id, updateChatDto);
  }

  @RoleD(UsersRole.ADMIN, UsersRole.SELLER)
  @UseGuards(RoleGuard)
  @UseGuards(TokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(id);
  }
}
