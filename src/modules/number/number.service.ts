import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { PersonService } from '../person/person.service'
import { PageService } from '../page/page.service'
import { PageResponse } from '../page/response'
import {
  EnAlphabet,
  EnVowelLetters,
  PageTypesEnum,
  RuAlphabet,
  RuVowelLetters,
} from 'src/common/constants/constants'
import { I18nService } from 'nestjs-i18n'
import { Person } from '../person/entities/person.entity'

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

      const page = await this.pageService.findOneByKey(key, PageTypesEnum.FATE_CARDS, language_code)
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

  async getFateNumber(
    user_uuid: string,
    language_code: string,
    user_data?: Person,
  ): Promise<PageResponse> {
    try {
      const userData = user_data ?? (await this.personService.getPersonData(user_uuid))
      const userBirthday = `${userData.birthday_day}${userData.birthday_month}${userData.birthday_year}`

      const fateNumber = this.getSumLte9(userBirthday)

      const page = await this.pageService.findOneByKey(
        fateNumber.toString(),
        PageTypesEnum.NUMBER_OF_FATE,
        language_code,
      )

      if (page) {
        page.page_title = await this.i18n.t('titles.fate_number')
        return page
      } else {
        Logger.error(`MISSING FATE NUMBER PAGE ${JSON.stringify(fateNumber)}`)
      }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getChronicDisease(
    user_uuid: string,
    language_code: string,
    user_data?: Person,
  ): Promise<PageResponse> {
    try {
      const userData = user_data ?? (await this.personService.getPersonData(user_uuid))

      const yearArcane = this.getYearArcane(userData.birthday_year.toString())
      const monthArcane = userData.birthday_month
      const tkk = this.getArcane(Math.abs(monthArcane - yearArcane)) //ТРЕТИЙ КАРМИЧЕСКИЙ УЗЕЛ

      const page = await this.pageService.findOneByKey(
        tkk.toString(),
        PageTypesEnum.CHRONIC_DISEASES,
        language_code,
      )

      if (page) {
        page.page_title = await this.i18n.t('titles.chronic_disease')
        return page
      } else {
        Logger.error(`MISSING DISEASE PAGE ${JSON.stringify(tkk)}`)
      }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getHealthNumerology(user_uuid: string, language_code: string): Promise<PageResponse[]> {
    try {
      const userData = await this.personService.getPersonData(user_uuid)

      const fateNumber = await this.getFateNumber(user_uuid, language_code, userData)
      const chronicDisease = await this.getChronicDisease(user_uuid, language_code, userData)

      const pages = [fateNumber, chronicDisease]

      if (!fateNumber && !chronicDisease) {
        throw new NotFoundException(this.i18n.t('errors.data_not_found'))
      }

      return pages
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getProfessions(user_uuid: string, language_code: string): Promise<PageResponse[]> {
    // TODO PLANETS
    try {
      const userData = await this.personService.getPersonData(user_uuid)
      const userBirthday = `${userData.birthday_day}${userData.birthday_month}${userData.birthday_year}`

      const yearArcane = this.getYearArcane(userData.birthday_year.toString())
      const monthArcane = userData.birthday_month
      const dayArcane = this.getArcane(userData.birthday_day)

      const pg1 = {
        number: this.getArcane(dayArcane + monthArcane + yearArcane).toString(),
        title: `${this.i18n.t('titles.pg')} 1`,
      }
      const pg2 = {
        number: this.getArcane(dayArcane + 2 * monthArcane + yearArcane).toString(),
        title: `${this.i18n.t('titles.pg')} 2`,
      }
      const pg3 = {
        number: this.getArcane(6 * dayArcane + 6 * monthArcane + 5 * yearArcane).toString(),
        title: `${this.i18n.t('titles.pg')} 3`,
      }
      const pg4 = {
        number: this.getSumLte9(userBirthday).toString(),
        title: `${this.i18n.t('titles.pg')} 4`,
      }
      const pg5 = {
        number: this.getSoulNumber(userData.first_name).toString(),
        title: `${this.i18n.t('titles.pg')} 5`,
      }

      const keys = [pg1, pg2, pg3, pg4, pg5]
      const pages = []
      for (const pg of keys) {
        const page = await this.pageService.findOneByKey(
          pg.number.toString(),
          PageTypesEnum.PROFESSIONS,
          language_code,
        )

        if (page) {
          page.page_title = pg.title
          pages.push(page)
        } else {
          Logger.error(`MISSING PAGE ${JSON.stringify(pg)}`)
        }
      }

      if (pages.length == 0) {
        throw new NotFoundException(await this.i18n.t('errors.data_not_found'))
      }

      return pages
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getNegativeTraits(user_uuid: string, language_code: string): Promise<PageResponse[]> {
    // TODO PLANETS
    try {
      const userData = await this.personService.getPersonData(user_uuid)

      const yearArcane = this.getYearArcane(userData.birthday_year.toString())
      const monthArcane = userData.birthday_month
      const dayArcane = this.getArcane(userData.birthday_day)

      const nt1 = {
        number: this.getArcane(Math.abs(dayArcane - monthArcane)).toString(),
        title: `${this.i18n.t('titles.negative_traits')} 1`,
      }
      const nt2 = {
        number: this.getArcane(Math.abs(dayArcane - yearArcane)).toString(),
        title: `${this.i18n.t('titles.negative_traits')} 2`,
      }
      const nt3 = {
        number: this.getArcane(monthArcane - yearArcane).toString(),
        title: `${this.i18n.t('titles.negative_traits')} 3`,
      }

      const keys = [nt1, nt2, nt3]

      const pages = []
      for (const key of keys) {
        const page = await this.pageService.findOneByKey(
          key.number.toString(),
          PageTypesEnum.WEAK_TRAITS,
          language_code,
        )

        if (page) {
          page.page_title = key.title
          pages.push(page)
        } else {
          Logger.error(`MISSING PAGE ${JSON.stringify(key)}`)
        }
      }

      if (pages.length == 0) {
        throw new NotFoundException(await this.i18n.t('errors.data_not_found'))
      }

      return pages
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getPlanets(user_uuid: string, language_code: string): Promise<PageResponse[]> {
    try {
      const userData = await this.personService.getPersonData(user_uuid)
      const userBirthday = `${userData.birthday_day}${userData.birthday_month}${userData.birthday_year}`

      const lifePathNumber = {
        number: this.getSumLte9(userBirthday).toString(),
        title: this.i18n.t('titles.life_path_number'),
      }
      const soulNumber = {
        number: this.getSoulNumber(userData.first_name).toString(),
        title: this.i18n.t('titles.soul_number'),
      }

      const keys = [lifePathNumber, soulNumber]

      const pages = []
      for (const key of keys) {
        const page = await this.pageService.findOneByKey(
          key.number.toString(),
          PageTypesEnum.PLANETS,
          language_code,
        )

        if (page) {
          page.page_title = key.title
          pages.push(page)
        } else {
          Logger.error(`MISSING PAGE ${JSON.stringify(key)}`)
        }
      }

      if (pages.length == 0) {
        throw new NotFoundException(await this.i18n.t('errors.data_not_found'))
      }

      return pages
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getAncestors(user_uuid: string, language_code: string): Promise<PageResponse> {
    try {
      const userData = await this.personService.getPersonData(user_uuid)

      const lastNameArcane = this.getArcane(this.getNameNumber(userData.last_name, false))

      const page = await this.pageService.findOneByKey(
        lastNameArcane.toString(),
        PageTypesEnum.PARENTS,
        language_code,
      )

      if (page) {
        return page
      } else {
        throw new NotFoundException(await this.i18n.t('errors.page_not_found'))
      }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getTotemicAnimal(user_uuid: string, language_code: string): Promise<PageResponse> {
    try {
      const userData = await this.personService.getPersonData(user_uuid)
      const key = `${('0' + userData.birthday_day).slice(-2)}.${('0' + userData.birthday_month).slice(-2)}`

      const page = await this.pageService.findOneByKey(
        key,
        PageTypesEnum.TOTEMIC_ANIMAl,
        language_code,
      )

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

  getSumLte9(value: string): number {
    let result = 0
    for (const number of value) {
      result += Number(number)
    }

    while (result > 9) {
      let num = 0
      for (const number of result.toString()) {
        num += Number(number)
      }

      result = num
    }

    return result
  }

  getNameNumber(name: string, onlyVowel: boolean = true): number {
    let nameLetters = name.split('')

    if (onlyVowel) {
      nameLetters = nameLetters.filter(
        (letter) =>
          RuVowelLetters.includes(letter.toLowerCase()) ||
          EnVowelLetters.includes(letter.toLowerCase()),
      )
    }

    let result = 0
    for (const letter of nameLetters) {
      result += this.getLetterNumber(letter)
    }

    return result
  }

  getSoulNumber(firstName: string): number {
    const nameNumber = this.getNameNumber(firstName)
    const soulNumber = this.getSumLte9(nameNumber.toString())

    return soulNumber
  }

  getLetterNumber(letter: string): number {
    let letterNumber = RuAlphabet.indexOf(letter.toUpperCase()) + 1
    if (letterNumber == 0) {
      letterNumber = EnAlphabet.indexOf(letter.toUpperCase()) + 1
    }

    while (letterNumber > 9) {
      letterNumber -= 9
    }

    console.log(letter, letterNumber)

    return letterNumber
  }

  getYearArcane(value: string): number {
    let arcane = 0
    for (const number of value) {
      arcane += Number(number)
    }

    if (arcane > 22) {
      arcane = arcane - 22
    }

    return arcane
  }

  getArcane(value: number): number {
    let arcane = value
    while (arcane > 22) {
      arcane -= 22
    }

    if (arcane == 0) arcane = 22

    return arcane
  }
}
