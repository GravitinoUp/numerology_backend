import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { PersonService } from '../person/person.service'
import { PageService } from '../page/page.service'
import { PageResponse } from '../page/response'
import { PageTypesEnum } from 'src/common/constants/constants'
import { I18nService } from 'nestjs-i18n'
import { Person } from '../person/entities/person.entity'
import { GetCompatibilityDto } from './dto'
import {
  getArcane,
  getLongNumberArcane,
  getNameNumber,
  getQuersumme,
  getSoulNumber,
} from 'src/common/utils/numbers'
import { UserService } from '../user/user.service'

@Injectable()
export class NumberService {
  constructor(
    private readonly personService: PersonService,
    private readonly userService: UserService,
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

      const fateNumber = getQuersumme(userBirthday)

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

      const yearArcane = getLongNumberArcane(userData.birthday_year.toString())
      const monthArcane = userData.birthday_month
      const tkk = getArcane(Math.abs(monthArcane - yearArcane)) //ТРЕТИЙ КАРМИЧЕСКИЙ УЗЕЛ

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

      const yearArcane = getLongNumberArcane(userData.birthday_year.toString())
      const monthArcane = userData.birthday_month
      const dayArcane = getArcane(userData.birthday_day)

      const pg1 = {
        number: getArcane(dayArcane + monthArcane + yearArcane).toString(),
        title: `${this.i18n.t('titles.pg')} 1`,
      }
      const pg2 = {
        number: getArcane(dayArcane + 2 * monthArcane + yearArcane).toString(),
        title: `${this.i18n.t('titles.pg')} 2`,
      }
      const pg3 = {
        number: getArcane(6 * dayArcane + 6 * monthArcane + 5 * yearArcane).toString(),
        title: `${this.i18n.t('titles.pg')} 3`,
      }
      const pg4 = {
        number: getQuersumme(userBirthday).toString(),
        title: `${this.i18n.t('titles.pg')} 4`,
      }
      const pg5 = {
        number: getSoulNumber(userData.first_name).toString(),
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

      const yearArcane = getLongNumberArcane(userData.birthday_year.toString())
      const monthArcane = userData.birthday_month
      const dayArcane = getArcane(userData.birthday_day)

      const nt1 = {
        number: getArcane(Math.abs(dayArcane - monthArcane)).toString(),
        title: `${this.i18n.t('titles.negative_traits')} 1`,
      }
      const nt2 = {
        number: getArcane(Math.abs(dayArcane - yearArcane)).toString(),
        title: `${this.i18n.t('titles.negative_traits')} 2`,
      }
      const nt3 = {
        number: getArcane(monthArcane - yearArcane).toString(),
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

      const yearArcane = getLongNumberArcane(userData.birthday_year.toString())
      const monthArcane = userData.birthday_month
      const dayArcane = getArcane(userData.birthday_day)

      const positiveTrait1 = {
        number: getArcane(dayArcane),
        title: `${this.i18n.t('titles.positive_traits')} 1`,
      }
      const positiveTrait2 = {
        number: getArcane(monthArcane),
        title: `${this.i18n.t('titles.positive_traits')} 2`,
      }
      const positiveTrait3 = {
        number: getLongNumberArcane(yearArcane.toString()),
        title: `${this.i18n.t('titles.positive_traits')} 3`,
      }
      const positiveTrait4 = {
        number: getArcane(dayArcane + monthArcane + yearArcane),
        title: `${this.i18n.t('titles.positive_traits')} 4`,
      }

      const positiveTrait5 = {
        number: getQuersumme(userBirthday),
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
        number: getQuersumme(userBirthday).toString(),
        title: this.i18n.t('titles.life_path_number'),
      }
      const soulNumber = {
        number: getSoulNumber(userData.first_name).toString(),
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

      const lastNameArcane = getArcane(getNameNumber(userData.last_name, false))

      const page = await this.pageService.findOneByKey(
        lastNameArcane.toString(),
        PageTypesEnum.ANCESTORS,
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
        number: getQuersumme(getNameNumber(userData.first_name, false).toString()),
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
        number: getArcane(userData.birthday_day),
        title: this.i18n.t('titles.day_task'),
        type: PageTypesEnum.TASKS,
      }
      const monthTask = {
        number: userData.birthday_month,
        title: this.i18n.t('titles.month_task'),
        type: PageTypesEnum.TASKS,
      }
      const yearTask = {
        number: getLongNumberArcane(userData.birthday_year.toString()),
        title: this.i18n.t('titles.year_task'),
        type: PageTypesEnum.TASKS,
      }
      const communityTask = {
        number: getArcane(dayTask.number + monthTask.number + yearTask.number),
        title: this.i18n.t('titles.community_task'),
        type: PageTypesEnum.TASKS,
      }
      const nameKey = {
        number: getArcane(getNameNumber(userData.first_name, false)),
        title: this.i18n.t('titles.secret_of_name'),
        type: PageTypesEnum.SECRET_OF_NAME,
      }
      const expressionNumberKey = {
        number: getQuersumme(
          getNameNumber(
            `${userData.first_name}${userData.last_name}${userData.patronymic}`,
            false,
            true,
          ).toString(),
        ),
        title: this.i18n.t('titles.expression_number'),
        type: PageTypesEnum.EXPRESSION_NUMBER,
      }
      const lifePathNumber = {
        number: getQuersumme(userBirthday),
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

      const dayTask = getArcane(userData.birthday_day)

      const monthTask = userData.birthday_month
      const yearTask = getLongNumberArcane(userData.birthday_year.toString())
      const communityTask = getArcane(dayTask + monthTask + yearTask)
      const nameKey = getArcane(getNameNumber(userData.first_name, false))
      const expressionNumberKey = getQuersumme(
        getNameNumber(
          `${userData.first_name}${userData.last_name}${userData.patronymic}`,
          false,
          true,
        ).toString(),
      )
      const lifePathNumber = getQuersumme(userBirthday)

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

      const yearArcane = getLongNumberArcane(userData.birthday_year.toString())
      const monthArcane = userData.birthday_month
      const dayArcane = getArcane(userData.birthday_day)

      const firstKarmicKnot = {
        number: getArcane(Math.abs(dayArcane - monthArcane)),
        title: this.i18n.t('titles.first_karmic_knot'),
      }
      const secondKarmicKnot = {
        number: getArcane(Math.abs(dayArcane - yearArcane)),
        title: this.i18n.t('titles.second_karmic_knot'),
      }
      const thirdKarmicKnot = {
        number: getArcane(Math.abs(monthArcane - yearArcane)),
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

  async getBloodType(bloodType: string, language_code: string): Promise<PageResponse> {
    try {
      const page = await this.pageService.findOneByKey(
        bloodType,
        PageTypesEnum.BLOOD_TYPE,
        language_code,
      )

      if (page) {
        page.page_title = this.i18n.t('titles.blood_type')
      } else {
        Logger.error(`MISSING PAGE getBloodType: ${JSON.stringify(bloodType)}`)
      }

      if (!page) {
        throw new NotFoundException(await this.i18n.t('errors.data_not_found'))
      }
      return page
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getAngelicNumerology(time: string, language_code: string): Promise<PageResponse> {
    try {
      const page = await this.pageService.findOneByKey(
        time,
        PageTypesEnum.ANGELIC_NUMEROLOGY,
        language_code,
      )

      if (page) {
        page.page_title = this.i18n.t('titles.angelic_numerology')
      } else {
        Logger.error(`MISSING PAGE getAngelicNumerology: ${JSON.stringify(time)}`)
      }

      if (!page) {
        throw new NotFoundException(await this.i18n.t('errors.data_not_found'))
      }
      return page
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getGuessingNumber(number: number, language_code: string): Promise<PageResponse> {
    try {
      const formattedNumber = `${number.toString()}3`
      const key = getLongNumberArcane(formattedNumber, 84)

      const page = await this.pageService.findOneByKey(
        key.toString(),
        PageTypesEnum.GUESSING_NUMBER,
        language_code,
      )

      if (page) {
        page.page_title = this.i18n.t('titles.guessing_by_numbers')
      } else {
        Logger.error(`MISSING PAGE getGuessingNumber: ${JSON.stringify(key)}`)
      }

      if (!page) {
        throw new NotFoundException(this.i18n.t('errors.data_not_found'))
      }
      return page
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getCompatibility(
    getCompatibilityDto: GetCompatibilityDto,
    language_code: string,
  ): Promise<PageResponse[]> {
    try {
      const firstDate = new Date(getCompatibilityDto.first_partner_date)
      const secondDate = new Date(getCompatibilityDto.second_partner_date)

      const firstPartnerDate = `${firstDate.getDate()}${firstDate.getMonth() + 1}${firstDate.getFullYear()}`
      const firstYearArcane = getLongNumberArcane(firstDate.getFullYear().toString())
      const firstMonthArcane = firstDate.getMonth() + 1
      const firstDayArcane = getArcane(firstDate.getDate())

      const secondPartnerDate = `${secondDate.getDate()}${secondDate.getMonth() + 1}${secondDate.getFullYear()}`
      const secondYearArcane = getLongNumberArcane(secondDate.getFullYear().toString())
      const secondMonthArcane = secondDate.getMonth() + 1
      const secondDayArcane = getArcane(secondDate.getDate())

      const firstArcane = getLongNumberArcane(firstPartnerDate)
      const secondArcane = getLongNumberArcane(secondPartnerDate)
      const arcaneCompatibility = {
        number: getArcane(firstArcane + secondArcane),
        title: this.i18n.t('titles.arcane_compatibility'),
        type: PageTypesEnum.ARCANE_COMPATIBILITY,
      }

      const firstSoulNumber = getLongNumberArcane(firstPartnerDate, 9)
      const secondSoulNumber = getLongNumberArcane(secondPartnerDate, 9)
      const soulNumberCompatibility = {
        number: getArcane(firstSoulNumber + secondSoulNumber),
        title: this.i18n.t('titles.soul_number_compatibility'),
        type: PageTypesEnum.SOUL_NUMBER_COMPATIBILITY,
      }

      const firstTaskNumber = getArcane(firstDayArcane + firstMonthArcane + firstYearArcane)
      const secondTaskNumber = getArcane(secondDayArcane + secondMonthArcane + secondYearArcane)
      const tasksCompatibility = {
        number: getArcane(firstTaskNumber + secondTaskNumber),
        title: this.i18n.t('titles.tasks_compatibility'),
        type: PageTypesEnum.JOINT_TASKS_COMPATIBILITY,
      }

      const firstDifficultyNumber = getArcane(firstDayArcane + firstMonthArcane)
      const secondDifficultyNumber = getArcane(secondDayArcane + secondMonthArcane)
      const difficultiesCompatibility = {
        number: getArcane(firstDifficultyNumber + secondDifficultyNumber),
        title: this.i18n.t('titles.difficulties_compatibility'),
        type: PageTypesEnum.DIFFICULTIES_COMPATIBILITY,
      }

      const keys = [
        arcaneCompatibility,
        soulNumberCompatibility,
        tasksCompatibility,
        difficultiesCompatibility,
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

  async getPersonalYearNumber(user_uuid: string, language_code: string): Promise<PageResponse> {
    try {
      const userData = await this.personService.getPersonData(user_uuid)
      const day = getQuersumme(userData.birthday_day.toString())
      const month = getQuersumme(userData.birthday_month.toString())
      const year = getQuersumme(new Date().getFullYear().toString())

      const formattedNumber = `${day}${month}${year}`
      const personalNumber = getQuersumme(formattedNumber)

      const page = await this.pageService.findOneByKey(
        personalNumber.toString(),
        PageTypesEnum.PERSONAL_YEAR_NUMBER,
        language_code,
      )

      if (page) {
        page.page_title = this.i18n.t('titles.personal_year_number')
      } else {
        Logger.error(`MISSING PAGE getPersonalYearNumber: ${JSON.stringify(personalNumber)}`)
      }

      if (!page) {
        throw new NotFoundException(this.i18n.t('errors.data_not_found'))
      }
      return page
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getPhoneNumberCalculation(user_uuid: string, language_code: string): Promise<PageResponse> {
    try {
      const userData = await this.userService.findByUuid(user_uuid, false)
      const phoneKey = getQuersumme(userData.phone.replaceAll('+', ''))

      const page = await this.pageService.findOneByKey(
        phoneKey.toString(),
        PageTypesEnum.PHONE_NUMBER_CALCULATION,
        language_code,
      )

      if (page) {
        page.page_title = this.i18n.t('titles.phone_number_calculation')
      } else {
        Logger.error(`MISSING PAGE getPhoneNumberCalculation: ${JSON.stringify(phoneKey)}`)
      }

      if (!page) {
        throw new NotFoundException(this.i18n.t('errors.data_not_found'))
      }
      return page
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getHouseNumberCalculation(number: number, language_code: string): Promise<PageResponse> {
    try {
      const houseKey = getQuersumme(number.toString())

      const page = await this.pageService.findOneByKey(
        houseKey.toString(),
        PageTypesEnum.HOUSE_NUMBER_CALCULATION,
        language_code,
      )

      if (page) {
        page.page_title = this.i18n.t('titles.house_number_calculation')
      } else {
        Logger.error(`MISSING PAGE getHouseNumberCalculation: ${JSON.stringify(houseKey)}`)
      }

      if (!page) {
        throw new NotFoundException(this.i18n.t('errors.data_not_found'))
      }
      return page
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getFateNumberGift(date: Date, language_code: string): Promise<PageResponse> {
    try {
      const formattedDate = `${date.getDate()}${date.getMonth() + 1}${date.getFullYear()}`
      const giftKey = getQuersumme(formattedDate)

      const page = await this.pageService.findOneByKey(
        giftKey.toString(),
        PageTypesEnum.FATE_NUMBER_GIFTS,
        language_code,
      )

      if (page) {
        page.page_title = this.i18n.t('titles.fate_number_gifts')
      } else {
        Logger.error(`MISSING PAGE getFateNumberGift: ${JSON.stringify(giftKey)}`)
      }

      if (!page) {
        throw new NotFoundException(this.i18n.t('errors.data_not_found'))
      }
      return page
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getAromatherapy(user_uuid: string, language_code: string): Promise<PageResponse[]> {
    try {
      const userData = await this.personService.getPersonData(user_uuid)
      const userBirthday = `${userData.birthday_day}${userData.birthday_month}${userData.birthday_year}`

      const soulNumberKey = {
        number: getQuersumme(userBirthday),
        title: '',
        type: PageTypesEnum.SOUL_NUMBER_ESSENTIAL_OIL,
      }

      const dayArcaneKey = {
        number: getArcane(userData.birthday_day),
        title: '',
        type: PageTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
      }

      const keys = [soulNumberKey, dayArcaneKey]

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
}
