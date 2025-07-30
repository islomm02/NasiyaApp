import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { DebterService } from './debter.service';
import { CreateDebterDto } from './dto/create-debter.dto';
import { UpdateDebterDto } from './dto/update-debter.dto';
import { RoleD } from 'src/decorator/role-decorators';
import { TokenGuard } from 'src/guards/token.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { UsersRole } from '@prisma/client';

@Controller('debter')
export class DebterController {
  constructor(private readonly debterService: DebterService) {}

  @RoleD(UsersRole.SELLER)
  @UseGuards(RoleGuard)
  @UseGuards(TokenGuard)
  @Post()
  create(@Body() createDebterDto: CreateDebterDto, @Request() req) {
    console.log(req)
    return this.debterService.create(createDebterDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.debterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.debterService.findOne(id);
  }

  @RoleD(UsersRole.ADMIN, UsersRole.SELLER)
  @UseGuards(RoleGuard)
  @UseGuards(TokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDebterDto: UpdateDebterDto) {
    return this.debterService.update(id, updateDebterDto);
  }

  @RoleD(UsersRole.ADMIN, UsersRole.SELLER)
  @UseGuards(RoleGuard)
  @UseGuards(TokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.debterService.remove(id);
  }
}
