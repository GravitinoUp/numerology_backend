import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
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

  async getFateNumber(user_uuid: string, language_code: string): Promise<PageResponse> {
    try {
      const userData = await this.personService.getPersonData(user_uuid)
      const userBirthday = `${userData.birthday_day}${userData.birthday_month}${userData.birthday_year}`

      const fateNumber = this.getSumLte9(userBirthday)

      const page = await this.pageService.findOneByKey(
        fateNumber.toString(),
        PageTypesEnum.NUMBER_OF_FATE,
        language_code,
      )

      return page
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getChronicDisease(user_uuid: string, language_code: string): Promise<PageResponse> {
    try {
      const userData = await this.personService.getPersonData(user_uuid)

      const yearArcane = this.getYearArcane(userData.birthday_year.toString())
      const monthArcane = userData.birthday_month
      const tkk = this.getArcane(Math.abs(monthArcane - yearArcane)) //ТРЕТИЙ КАРМИЧЕСКИЙ УЗЕЛ

      const page = await this.pageService.findOneByKey(
        tkk.toString(),
        PageTypesEnum.CHRONIC_DISEASES,
        language_code,
      )

      return page
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

      const pg1 = this.getArcane(dayArcane + monthArcane + yearArcane).toString()
      const pg2 = this.getArcane(dayArcane + 2 * monthArcane + yearArcane).toString()
      const pg3 = this.getArcane(6 * dayArcane + 6 * monthArcane + 5 * yearArcane).toString()
      const pg4 = this.getSumLte9(userBirthday).toString()
      const pg5 = this.getSoulNumber(userData.first_name).toString()

      const pages = await this.pageService.findAllByKeys(
        [pg1, pg2, pg3, pg4, pg5],
        PageTypesEnum.PROFESSIONS,
        language_code,
      )

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

      const nt1 = this.getArcane(Math.abs(dayArcane - monthArcane)).toString()
      const nt2 = this.getArcane(Math.abs(dayArcane - yearArcane)).toString()
      const nt3 = this.getArcane(monthArcane - yearArcane).toString()

      const pages = await this.pageService.findAllByKeys(
        [nt1, nt2, nt3],
        PageTypesEnum.WEAK_TRAITS,
        language_code,
      )

      return pages
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getPlanets(user_uuid: string, language_code: string): Promise<PageResponse[]> {
    try {
      const userData = await this.personService.getPersonData(user_uuid)
      const userBirthday = `${userData.birthday_day}${userData.birthday_month}${userData.birthday_year}`

      const lifePathNumber = this.getSumLte9(userBirthday).toString()
      const soulNumber = this.getSoulNumber(userData.first_name).toString()

      const pages = await this.pageService.findAllByKeys(
        [lifePathNumber, soulNumber],
        PageTypesEnum.PLANETS,
        language_code,
      )

      return pages
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getParents(user_uuid: string, language_code: string): Promise<PageResponse> {
    try {
      const userData = await this.personService.getPersonData(user_uuid)

      const lastNameArcane = this.getArcane(this.getNameNumber(userData.last_name, false))

      const page = await this.pageService.findOneByKey(
        lastNameArcane.toString(),
        PageTypesEnum.PARENTS,
        language_code,
      )

      return page
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
