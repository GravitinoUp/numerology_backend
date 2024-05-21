import {
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common'
import { FilesService } from './files.service'
import { FilesInterceptor } from '@nestjs/platform-express'
import { I18nService } from 'nestjs-i18n'
import { extname } from 'path'
import { diskStorage } from 'multer'
import { Throttle } from '@nestjs/throttler'

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly i18n: I18nService,
  ) {}

  @UseInterceptors(
    FilesInterceptor('files', 1, {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const destination = `./uploads/${req.query.directory}`
          cb(null, `${destination}`)
        },
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('')

          return cb(null, `${randomName}${extname(file.originalname)}`)
        },
      }),
    }),
  )
  @Post('upload')
  async upload(
    @UploadedFiles()
    files: Array<Express.Multer.File>,
    @Req() request,
  ) {
    const urls = []

    for (let index = 0; index < files.length; index++) {
      const file = files[index]

      if (file.size > 5 * 1024 * 1024) {
        throw new Error('Размер файла превышает 5 мб')
      }

      const url = `${request.protocol}://${request.get('Host')}/file/uploads?path=${file.path}`
      urls.push(url)
    }

    return urls
  }

  @Get('uploads')
  @Throttle({ default: { limit: 100, ttl: 1000 } })
  async findUpload(@Query('path') path: string, @Req() request, @Res() res) {
    return res.sendFile(path, { root: './' })
  }
}
