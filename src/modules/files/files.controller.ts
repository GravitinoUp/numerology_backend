import {
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FilesService } from './files.service'
import { FilesInterceptor } from '@nestjs/platform-express'
import { I18nService } from 'nestjs-i18n'
import { extname } from 'path'
import { diskStorage } from 'multer'
import { Throttle } from '@nestjs/throttler'
import { RolesEnum } from 'src/common/constants/constants'
import { Roles } from '../role/guards/decorators/role.decorator'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { ActiveGuard } from '../auth/guards/active.guard'
import { RolesGuard } from '../role/guards/roles.guard'

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
  @UseGuards(JwtAuthGuard, ActiveGuard, RolesGuard)
  @Roles([RolesEnum.MANAGER, RolesEnum.ADMIN])
  @Post('upload')
  async upload(
    @Query('directory') directory: string,
    @UploadedFiles()
    files: Array<Express.Multer.File>,
  ) {
    const urls = []

    for (let index = 0; index < files.length; index++) {
      const file = files[index]

      if (file.size > 5 * 1024 * 1024) {
        throw new Error('Размер файла превышает 5 мб')
      }

      const url = `/files/uploads?path=${file.path}`
      urls.push(url)
    }

    return urls
  }

  @Get('uploads')
  @Throttle({ default: { limit: 10000, ttl: 1000 } })
  async findUpload(@Query('path') path: string, @Req() request, @Res() res) {
    return res.sendFile(path, { root: './' })
  }
}
