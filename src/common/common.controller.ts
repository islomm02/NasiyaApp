import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { CommonService } from './common.service';
import { CreateCommonDto } from './dto/create-common.dto';
import { UpdateCommonDto } from './dto/update-common.dto';
import { RoleD } from 'src/decorator/role-decorators';
import { UsersRole } from '@prisma/client';
import { RoleGuard } from 'src/guards/role.guard';
import { TokenGuard } from 'src/guards/token.guard';

@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @RoleD(UsersRole.SELLER)
  @UseGuards(RoleGuard)
  @UseGuards(TokenGuard)
  @Get("debts")
  findAllDebts(@Request() req) {
    return this.commonService.findAllDebts(req.user.id);
  }

}
