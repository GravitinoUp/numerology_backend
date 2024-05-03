import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PersonService } from '../person/person.service'
import { PageService } from '../page/page.service'
import { PageResponse } from '../page/response'
import { PageTypesEnum } from 'src/common/constants/constants'
import { I18nService } from 'nestjs-i18n'

@Injectable()
export class NumberService {
  constructor(
    private readonly personService: PersonService,
    private readonly pageService: PageService,
    private readonly i18n: I18nService,
  ) {}

  async getFateCard(user_uuid: string, language_code: string): Promise<PageResponse> {
    try {
      const userData = await this.personService.getPersonData(user_uuid)
      const key = `${('0' + userData.birthday_day).slice(-2)}.${('0' + userData.birthday_month).slice(-2)}`

      const page = await this.pageService.findByKey(key, PageTypesEnum.FATE_CARDS, language_code)
      if (page) {
        return page
      } else {
        throw new HttpException(
          await this.i18n.t('errors.fate_card_not_found'),
          HttpStatus.NOT_FOUND,
        )
      }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
