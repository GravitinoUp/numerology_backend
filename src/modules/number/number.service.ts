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

      const fateNumber = this.getQuersumme(userBirthday)

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
        number: this.getQuersumme(userBirthday).toString(),
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

  async getStrongQualitites(user_uuid: string, language_code: string): Promise<PageResponse[]> {
    // TODO PLANETS
    try {
      const userData = await this.personService.getPersonData(user_uuid)
      const userBirthday = `${userData.birthday_day}${userData.birthday_month}${userData.birthday_year}`

      const yearArcane = this.getYearArcane(userData.birthday_year.toString())
      const monthArcane = userData.birthday_month
      const dayArcane = this.getArcane(userData.birthday_day)

      const positiveTrait1 = {
        number: this.getArcane(dayArcane),
        title: `${this.i18n.t('titles.positive_traits')} 1`,
      }
      const positiveTrait2 = {
        number: this.getArcane(monthArcane),
        title: `${this.i18n.t('titles.positive_traits')} 2`,
      }
      const positiveTrait3 = {
        number: this.getYearArcane(yearArcane.toString()),
        title: `${this.i18n.t('titles.positive_traits')} 3`,
      }
      const positiveTrait4 = {
        number: this.getArcane(dayArcane + monthArcane + yearArcane),
        title: `${this.i18n.t('titles.positive_traits')} 4`,
      }

      const positiveTrait5 = {
        number: this.getQuersumme(userBirthday),
        title: `${this.i18n.t('titles.positive_traits')} 5`,
      }

      const keys = [positiveTrait1, positiveTrait2, positiveTrait3, positiveTrait4, positiveTrait5]

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
        number: this.getQuersumme(userBirthday).toString(),
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

  async getTotemicAnimals(user_uuid: string, language_code: string): Promise<PageResponse[]> {
    try {
      const userData = await this.personService.getPersonData(user_uuid)

      const dateKey = {
        number: `${('0' + userData.birthday_day).slice(-2)}.${('0' + userData.birthday_month).slice(-2)}`,
        title: this.i18n.t('titles.day_totem'),
      }
      const yearKey = { number: userData.birthday_year, title: this.i18n.t('titles.year_totem') }
      const nameKey = {
        number: this.getQuersumme(this.getNameNumber(userData.first_name, false).toString()),
        title: this.i18n.t('titles.name_totem'),
      }

      const keys = [dateKey, yearKey, nameKey]

      const pages = []
      for (const key of keys) {
        const page = await this.pageService.findOneByKey(
          key.number.toString(),
          PageTypesEnum.TOTEMIC_ANIMAl,
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

  async getDestinyProgram(user_uuid: string, language_code: string): Promise<PageResponse[]> {
    try {
      const userData = await this.personService.getPersonData(user_uuid)
      const userBirthday = `${userData.birthday_day}${userData.birthday_month}${userData.birthday_year}`

      const dayTask = {
        number: this.getArcane(userData.birthday_day),
        title: this.i18n.t('titles.day_task'),
        type: PageTypesEnum.TASKS,
      }
      const monthTask = {
        number: userData.birthday_month,
        title: this.i18n.t('titles.month_task'),
        type: PageTypesEnum.TASKS,
      }
      const yearTask = {
        number: this.getYearArcane(userData.birthday_year.toString()),
        title: this.i18n.t('titles.year_task'),
        type: PageTypesEnum.TASKS,
      }
      const communityTask = {
        number: this.getArcane(dayTask.number + monthTask.number + yearTask.number),
        title: this.i18n.t('titles.community_task'),
        type: PageTypesEnum.TASKS,
      }
      const nameKey = {
        number: this.getArcane(this.getNameNumber(userData.first_name, false)),
        title: this.i18n.t('titles.secret_of_name'),
        type: PageTypesEnum.SECRET_OF_NAME,
      }
      const expressionNumberKey = {
        number: this.getQuersumme(
          this.getNameNumber(
            `${userData.first_name}${userData.last_name}${userData.patronymic}`,
            false,
            true,
          ).toString(),
        ),
        title: this.i18n.t('titles.expression_number'),
        type: PageTypesEnum.EXPRESSION_NUMBER,
      }
      const lifePathNumber = {
        number: this.getQuersumme(userBirthday),
        title: this.i18n.t('titles.life_path_number'),
        type: PageTypesEnum.LIFE_PATH_NUMBER,
      }

      const keys = [
        dayTask,
        monthTask,
        yearTask,
        communityTask,
        nameKey,
        expressionNumberKey,
        lifePathNumber,
      ]

      const pages = []
      for (const key of keys) {
        const page = await this.pageService.findOneByKey(
          key.number.toString(),
          key.type,
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

  async getLuckyNumbers(user_uuid: string): Promise<number[]> {
    try {
      const userData = await this.personService.getPersonData(user_uuid)
      const userBirthday = `${userData.birthday_day}${userData.birthday_month}${userData.birthday_year}`

      const dayTask = this.getArcane(userData.birthday_day)

      const monthTask = userData.birthday_month
      const yearTask = this.getYearArcane(userData.birthday_year.toString())
      const communityTask = this.getArcane(dayTask + monthTask + yearTask)
      const nameKey = this.getArcane(this.getNameNumber(userData.first_name, false))
      const expressionNumberKey = this.getQuersumme(
        this.getNameNumber(
          `${userData.first_name}${userData.last_name}${userData.patronymic}`,
          false,
          true,
        ).toString(),
      )
      const lifePathNumber = this.getQuersumme(userBirthday)

      const keys = [
        dayTask,
        monthTask,
        yearTask,
        communityTask,
        nameKey,
        expressionNumberKey,
        lifePathNumber,
      ]

      return keys
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getKarma(user_uuid: string, language_code: string): Promise<PageResponse[]> {
    try {
      const userData = await this.personService.getPersonData(user_uuid)

      const yearArcane = this.getYearArcane(userData.birthday_year.toString())
      const monthArcane = userData.birthday_month
      const dayArcane = this.getArcane(userData.birthday_day)

      const firstKarmicKnot = {
        number: this.getArcane(Math.abs(dayArcane - monthArcane)),
        title: this.i18n.t('titles.first_karmic_knot'),
      }
      const secondKarmicKnot = {
        number: this.getArcane(Math.abs(dayArcane - yearArcane)),
        title: this.i18n.t('titles.second_karmic_knot'),
      }
      const thirdKarmicKnot = {
        number: this.getArcane(Math.abs(monthArcane - yearArcane)),
        title: this.i18n.t('titles.third_karmic_knot'),
      }

      const keys = [firstKarmicKnot, secondKarmicKnot, thirdKarmicKnot]

      const pages = []
      for (const key of keys) {
        const page = await this.pageService.findOneByKey(
          key.number.toString(),
          PageTypesEnum.KARMA,
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

  getQuersumme(value: string): number {
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

  getNameNumber(name: string, onlyVowel: boolean = true, onlyConsonants: boolean = false): number {
    let nameLetters = name.split('')

    if (onlyVowel) {
      nameLetters = nameLetters.filter(
        (letter) =>
          RuVowelLetters.includes(letter.toLowerCase()) ||
          EnVowelLetters.includes(letter.toLowerCase()),
      )
    } else if (onlyConsonants) {
      nameLetters = nameLetters.filter(
        (letter) =>
          !RuVowelLetters.includes(letter.toLowerCase()) &&
          !EnVowelLetters.includes(letter.toLowerCase()),
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
    const soulNumber = this.getQuersumme(nameNumber.toString())

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
