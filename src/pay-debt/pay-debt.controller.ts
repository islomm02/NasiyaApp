import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { PayDebtService } from './pay-debt.service';
import { CreatePayDebtDto, CreatePayDebtDtoAny } from './dto/create-pay-debt.dto';
import { UpdatePayDebtDto } from './dto/update-pay-debt.dto';
import { ApiQueryComponent } from 'src/hooks/ApiQueryComponent';
import { GetQueryDto } from 'src/sellers/dto/QueryDto';
import { RoleD } from 'src/decorator/role-decorators';
import { UsersRole } from '@prisma/client';
import { RoleGuard } from 'src/guards/role.guard';
import { TokenGuard } from 'src/guards/token.guard';
import { CreatePayAllDebtDto } from './dto/pay-all-dto';

@Controller('pay-debt')
export class PayDebtController {
  constructor(private readonly payDebtService: PayDebtService) {}


  @Post()
  @RoleD(UsersRole.SELLER, UsersRole.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(TokenGuard)
  create(@Body() createPayDebtDto: CreatePayDebtDto) {
    return this.payDebtService.create(createPayDebtDto);
  }
  
  @Post("amount")
  @RoleD(UsersRole.SELLER, UsersRole.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(TokenGuard)
  createForAny(@Body() createPayDebtDto: CreatePayDebtDtoAny) {
    return this.payDebtService.createAny(createPayDebtDto);
  }

  @Post("all")
  @RoleD(UsersRole.SELLER, UsersRole.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(TokenGuard)
  payAll(@Body() data: CreatePayAllDebtDto) {
    return this.payDebtService.payAll(data.debtId);
  }
}
