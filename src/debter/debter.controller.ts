import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { DebterService } from './debter.service';
import { CreateDebterDto } from './dto/create-debter.dto';
import { UpdateDebterDto } from './dto/update-debter.dto';
import { RoleD } from 'src/decorator/role-decorators';
import { TokenGuard } from 'src/guards/token.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { UsersRole } from '@prisma/client';
import { ApiQueryComponent } from 'src/hooks/ApiQueryComponent';
import { GetQueryDto } from 'src/sellers/dto/QueryDto';

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

    @ApiQueryComponent(["name", "phone"])

  @Get()
  findAll(@Query() query: GetQueryDto) {
    return this.debterService.findAll(query);
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
