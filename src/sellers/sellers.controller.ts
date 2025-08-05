import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Request } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { RoleD } from 'src/decorator/role-decorators';
import { UsersRole } from '@prisma/client';
import { RoleGuard } from 'src/guards/role.guard';
import { TokenGuard } from 'src/guards/token.guard';
import { ApiQueryComponent } from 'src/hooks/ApiQueryComponent';
import { GetQueryDto } from './dto/QueryDto';

@Controller('sellers')
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}

  @Post()
  create(@Body() createSellerDto: CreateSellerDto) {
    return this.sellersService.create(createSellerDto);
  }

  

  @ApiQueryComponent(["username", "phone"])
  @Get()
  findAll(@Query() query: GetQueryDto) {
    return this.sellersService.findAll(query);
  }

  @RoleD(UsersRole.SELLER, UsersRole.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(TokenGuard)
  @Get()
  getMe(@Request() req) {
    return this.sellersService.getMe(req["user"].id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sellersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSellerDto: UpdateSellerDto) {
    return this.sellersService.update(id, updateSellerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sellersService.remove(id);
  }
}
