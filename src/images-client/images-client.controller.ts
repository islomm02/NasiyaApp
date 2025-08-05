import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ImagesClientService } from './images-client.service';
import { CreateImagesClientDto } from './dto/create-images-client.dto';
import { UpdateImagesClientDto } from './dto/update-images-client.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('images-client')
export class ImagesClientController {
  constructor(private readonly imagesClientService: ImagesClientService) {}

  @Post()
  create(@Body() createImagesClientDto: CreateImagesClientDto) {
    return this.imagesClientService.create(createImagesClientDto);
  }

  @Get()
  @ApiQuery({name: "debterId", required:false, description: "Enter id of debter"})
  findOne( @Query() debterId: string) {
    return this.imagesClientService.findOne( debterId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImagesClientDto: UpdateImagesClientDto) {
    return this.imagesClientService.update(id, updateImagesClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagesClientService.remove(id);
  }
}
