import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ImagesDebtService } from './images-debt.service';
import { CreateImagesDebtDto } from './dto/create-images-debt.dto';
import { UpdateImagesDebtDto } from './dto/update-images-debt.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('images-debt')
export class ImagesDebtController {
  constructor(private readonly imagesDebtService: ImagesDebtService) {}

  @Post()
  create(@Body() createImagesDebtDto: CreateImagesDebtDto) {
    return this.imagesDebtService.create(createImagesDebtDto);
  }

  @Get()
  @ApiQuery({name: "debtId", required: false, description: "Enter id of debt"})
  findOne(@Query("debtId") id: string) {
    return this.imagesDebtService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImagesDebtDto: UpdateImagesDebtDto) {
    return this.imagesDebtService.update(+id, updateImagesDebtDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagesDebtService.remove(+id);
  }
}
