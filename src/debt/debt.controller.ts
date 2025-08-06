import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Request,
} from '@nestjs/common';
import { DebtService } from './debt.service';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { RoleD } from 'src/decorator/role-decorators';
import { UsersRole } from '@prisma/client';
import { RoleGuard } from 'src/guards/role.guard';
import { TokenGuard } from 'src/guards/token.guard';
import { GetQueryDto } from 'src/sellers/dto/QueryDto';
import { ApiQueryComponent } from 'src/hooks/ApiQueryComponent';

@Controller('debt')
export class DebtController {
  constructor(private readonly debtService: DebtService) {}

  @RoleD(UsersRole.SELLER)
  @UseGuards(RoleGuard)
  @UseGuards(TokenGuard)
  @Post()
  create(@Body() createDebtDto: CreateDebtDto, @Request() req) {
    return this.debtService.create(createDebtDto, req.user.id);
  }

  @ApiQueryComponent(["name", "summaryAmount", "term"])
  @Get()
  findAll(@Query() query: GetQueryDto) {
    return this.debtService.findAll(query);
  }
  
  
  @Get("overdue")
  overrude() {
    return this.debtService.overrude();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.debtService.findOne(id);
  }

  @RoleD(UsersRole.ADMIN, UsersRole.SELLER)
  @UseGuards(RoleGuard)
  @UseGuards(TokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDebtDto: UpdateDebtDto) {
    return this.debtService.update(id, updateDebtDto);
  }

  @RoleD(UsersRole.ADMIN, UsersRole.SELLER)
  @UseGuards(RoleGuard)
  @UseGuards(TokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.debtService.remove(id);
  }
}
