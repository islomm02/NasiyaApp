// multer.controller.ts
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiConsumes, ApiBody, ApiTags, ApiOperation } from '@nestjs/swagger';
import { UploadFileDto } from './upload-file.dto';

const multerOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const fileName = `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`;
      cb(null, fileName);
    },
  }),
};

@ApiTags('Fayl Yuklash')
@Controller('multer')
export class MulterController {
  @Post('upload')
  @ApiOperation({ summary: 'Fayl yuklash' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Fayl tanlang',
    type: UploadFileDto,
  })
  @UseInterceptors(FileInterceptor('file', multerOptions))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      url: `uploads/${file.filename}`,
    };
  }
}
