// multer.service.ts
import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Injectable()
export class MulterService {
  getMulterOptions(destination: string) {
    return {
      storage: diskStorage({
        destination: destination,
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const fileName = `${file.fieldname}-${uniqueSuffix}${ext}`;
          cb(null, fileName);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          cb(new Error('Only image files are allowed!'), false);
        } else {
          cb(null, true);
        }
      },
    };
  }
}
