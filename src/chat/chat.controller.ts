import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { RoleD } from 'src/decorator/role-decorators';
import { UsersRole } from '@prisma/client';
import { RoleGuard } from 'src/guards/role.guard';
import { TokenGuard } from 'src/guards/token.guard';
import { ApiQuery } from '@nestjs/swagger';

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
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "sortBy", required: false, type: String })
  @ApiQuery({ name: "sortOrder", required: false, enum: ["asc", "desc"] })
  @ApiQuery({ name: "search", required: false, type: String })
  @ApiQuery({ name: "debterId", required: false, type: String })
  @ApiQuery({ name: "sellerId", required: false, type: String })
  findAll(
    @Query("page") page?: number,
    @Query("limit") limit?: number,
    @Query("sortBy") sortBy?: string,
    @Query("sortOrder") sortOrder?: "asc" | "desc",
    @Query("search") search?: string,
    @Query("debterId") debterId?: string,
    @Query("sellerId") sellerId?: string,
    @Request() req?
  ) {
    return this.chatService.findAll({ page, limit, sortBy, sortOrder, search, debterId, sellerId, sellerIdToken: req.user.id });
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
  @Get('my-chats')
  findMyChats(@Request() req) {
    console.log(req);
    
    return this.chatService.findMyChats(req.user.id);
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
