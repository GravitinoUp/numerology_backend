import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { PersonService } from '../person/person.service'
import { FormulaResultService } from '../formula-result/formula-result.service'
import { FormulaResultResponse } from '../formula-result/response'
import { FormulaTypesEnum } from 'src/common/constants/constants'
import { I18nService } from 'nestjs-i18n'
import { Person } from '../person/entities/person.entity'
import { GetCompatibilityDto } from './dto'
import { getArcane, getLongNumberArcane, getNameNumber, getQuersumme, getSoulNumber } from 'src/common/utils/numbers'
import { UserService } from '../user/user.service'
import getLocalizedFormulaType from 'src/common/utils/get_localized_formula_type'
import { GraphDataResponse, GraphResponse } from './response'
import checkIntersects from 'src/utils/check-intersect'

@Injectable()
export class NumberService {
  constructor(
    private readonly personService: PersonService,
    private readonly userService: UserService,
    private readonly formulaResultService: FormulaResultService,
    private readonly i18n: I18nService,
  ) {}

  async getFateCard(user_uuid: string, language_code: string): Promise<FormulaResultResponse[]> {
    try {
      const userData = await this.personService.getPersonData(user_uuid)
      const key = `${('0' + userData.birthday_day).slice(-2)}.${('0' + userData.birthday_month).slice(-2)}`

      const page = await this.formulaResultService.findOneByKey(key, FormulaTypesEnum.FATE_CARDS, language_code)

      if (page) {
        page.formula_type = getLocalizedFormulaType(page.formula_type, language_code)

        return [page]
      } else {
        throw new HttpException(await this.i18n.t('errors.fate_card_not_found'), HttpStatus.NOT_FOUND)
      }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getFateNumber(user_uuid: string, language_code: string, user_data?: Person): Promise<FormulaResultResponse> {
    try {
      const userData = user_data ?? (await this.personService.getPersonData(user_uuid))
      const userBirthday = `${userData.birthday_day}${userData.birthday_month}${userData.birthday_year}`

      const fateNumber = getQuersumme(userBirthday)

      const page = await this.formulaResultService.findOneByKey(
        fateNumber.toString(),
        FormulaTypesEnum.NUMBER_OF_FATE,
        language_code,
      )

      if (page) {
        page.formula_type = getLocalizedFormulaType(page.formula_type, language_code)
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
  ): Promise<FormulaResultResponse> {
    try {
      const userData = user_data ?? (await this.personService.getPersonData(user_uuid))

      const yearArcane = getLongNumberArcane(userData.birthday_year.toString())
      const monthArcane = userData.birthday_month
      const tkk = getArcane(Math.abs(monthArcane - yearArcane)) //ТРЕТИЙ КАРМИЧЕСКИЙ УЗЕЛ

      const page = await this.formulaResultService.findOneByKey(
        tkk.toString(),
        FormulaTypesEnum.CHRONIC_DISEASES,
        language_code,
      )

      if (page) {
        page.formula_type = getLocalizedFormulaType(page.formula_type, language_code)
        return page
      } else {
        Logger.error(`MISSING DISEASE PAGE ${JSON.stringify(tkk)}`)
      }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getHealthNumerology(user_uuid: string, language_code: string): Promise<FormulaResultResponse[]> {
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

  async getDiseases(language_code: string): Promise<FormulaResultResponse[]> {
    try {
      const diseases = await this.formulaResultService.findAllByType(
        FormulaTypesEnum.METAPHYSICAL_CAUSES_OF_DISEASES,
        language_code,
      )

      const pages = []
      for (const disease of diseases) {
        if (disease) {
          disease.formula_type = getLocalizedFormulaType(disease.formula_type, language_code)
          pages.push(disease)
        } else {
          Logger.error(`MISSING PAGE: ${JSON.stringify(disease)}`)
        }
      }

      if (diseases.length == 0) {
        throw new NotFoundException(await this.i18n.t('errors.data_not_found'))
      }

      return pages
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getProfessions(user_uuid: string, language_code: string): Promise<FormulaResultResponse[]> {
    try {
      const userData = await this.personService.getPersonData(user_uuid)
      const userBirthday = `${userData.birthday_day}${userData.birthday_month}${userData.birthday_year}`

      const yearArcane = getLongNumberArcane(userData.birthday_year.toString())
      const monthArcane = userData.birthday_month
      const dayArcane = getArcane(userData.birthday_day)

      const pg1 = {
        number: getArcane(dayArcane + monthArcane + yearArcane).toString(),
        key: FormulaTypesEnum.PROFESSIONS,
        name: this.i18n.t('titles.profession_groups'),
      }
      const pg2 = {
        number: getArcane(dayArcane + 2 * monthArcane + yearArcane).toString(),
        key: FormulaTypesEnum.PROFESSIONS,
        name: this.i18n.t('titles.profession_groups'),
      }
      const pg3 = {
        number: getArcane(6 * dayArcane + 6 * monthArcane + 5 * yearArcane).toString(),
        key: FormulaTypesEnum.PROFESSIONS,
        name: this.i18n.t('titles.profession_groups'),
      }
      const pg4 = {
        number: getQuersumme(userBirthday).toString(),
        key: FormulaTypesEnum.PROFESSIONS,
        name: this.i18n.t('titles.profession_groups'),
      }
      const pg5 = {
        number: getSoulNumber(userData.first_name).toString(),
        key: FormulaTypesEnum.PROFESSIONS,
        name: this.i18n.t('titles.profession_groups'),
      }
      const keys = [pg1, pg2, pg3, pg4, pg5]
      const talentKeys = keys

      const pgPlanet1 = {
        number: pg4.number,
        key: FormulaTypesEnum.PLANETS,
        name: this.i18n.t('titles.profession_planets'),
      }
      keys.push(pgPlanet1)

      if (userData.birthday_day > 9) {
        const pgPlanet2 = {
          number: pg5.number, // TODO Должно быть 5 и 6
          key: FormulaTypesEnum.PLANETS,
          name: this.i18n.t('titles.profession_planets'),
        }

        keys.push(pgPlanet2)
      }

      const pages = []
      for (const pg of keys) {
        const page = await this.formulaResultService.findOneByKey(pg.number.toString(), pg.key, language_code)

        if (page) {
          page.formula_type = getLocalizedFormulaType(page.formula_type, language_code)
          page.formula_name = pg.name
          pages.push(page)
        } else {
          Logger.error(`MISSING PAGE: ${JSON.stringify(pg)}`)
        }
      }

      for (const talent of talentKeys) {
        const page = await this.formulaResultService.findOneByKey(
          talent.number.toString(),
          FormulaTypesEnum.TALENTS,
          language_code,
        )

        if (page) {
          page.formula_type = getLocalizedFormulaType(page.formula_type, language_code)
          pages.push(page)
        } else {
          Logger.error(`MISSING PAGE: ${JSON.stringify(talent)}`)
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

  async getNegativeTraits(user_uuid: string, language_code: string): Promise<FormulaResultResponse[]> {
    try {
      const userData = await this.personService.getPersonData(user_uuid)

      const yearArcane = getLongNumberArcane(userData.birthday_year.toString())
      const monthArcane = userData.birthday_month
      const dayArcane = getArcane(userData.birthday_day)

      const nt1 = {
        number: getArcane(Math.abs(dayArcane - monthArcane)).toString(),
        type: FormulaTypesEnum.WEAK_TRAITS,
      }
      const nt2 = {
        number: getArcane(Math.abs(dayArcane - yearArcane)).toString(),
        type: FormulaTypesEnum.WEAK_TRAITS,
      }
      const nt3 = {
        number: getArcane(Math.abs(monthArcane - yearArcane)).toString(),
        type: FormulaTypesEnum.WEAK_TRAITS,
      }

      const keys = [nt1, nt2, nt3]

      const ntPlanet1 = {
        number: userData.birthday_day.toString()[0],
        type: FormulaTypesEnum.PLANETS,
      }
      keys.push(ntPlanet1)

      if (userData.birthday_day > 9) {
        const ntPlanet2 = {
          number: userData.birthday_day.toString()[1],
          type: FormulaTypesEnum.PLANETS,
        }

        keys.push(ntPlanet2)
      }

      const pages = []
      for (const key of keys) {
        const page = await this.formulaResultService.findOneByKey(key.number.toString(), key.type, language_code)

        if (page) {
          page.formula_type = getLocalizedFormulaType(page.formula_type, language_code)
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
      console.log(error)

      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getStrongQualitites(user_uuid: string, language_code: string): Promise<FormulaResultResponse[]> {
    try {
      const userData = await this.personService.getPersonData(user_uuid)
      const userBirthday = `${userData.birthday_day}${userData.birthday_month}${userData.birthday_year}`

      const yearArcane = getLongNumberArcane(userData.birthday_year.toString())
      const monthArcane = userData.birthday_month
      const dayArcane = getArcane(userData.birthday_day)

      const positiveTrait1 = {
        number: getArcane(dayArcane).toString(),
        type: FormulaTypesEnum.STRONG_TRAITS,
      }
      const positiveTrait2 = {
        number: getArcane(monthArcane).toString(),
        type: FormulaTypesEnum.STRONG_TRAITS,
      }
      const positiveTrait3 = {
        number: getLongNumberArcane(yearArcane.toString()),
        type: FormulaTypesEnum.STRONG_TRAITS,
      }
      const positiveTrait4 = {
        number: getArcane(dayArcane + monthArcane + yearArcane).toString(),
        type: FormulaTypesEnum.STRONG_TRAITS,
      }

      const positiveTrait5 = {
        number: getQuersumme(userBirthday).toString(),
        type: FormulaTypesEnum.STRONG_TRAITS,
      }

      const keys = [positiveTrait1, positiveTrait2, positiveTrait3, positiveTrait4, positiveTrait5]

      const ptPlanet1 = {
        number: userData.birthday_day.toString()[0],
        type: FormulaTypesEnum.PLANETS,
      }
      keys.push(ptPlanet1)

      if (userData.birthday_day > 9) {
        const ptPlanet2 = {
          number: userData.birthday_day.toString()[1],
          type: FormulaTypesEnum.PLANETS,
        }

        keys.push(ptPlanet2)
      }

      const pages = []
      for (const key of keys) {
        const page = await this.formulaResultService.findOneByKey(key.number.toString(), key.type, language_code)

        if (page) {
          page.formula_type = getLocalizedFormulaType(page.formula_type, language_code)
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

  async getPlanets(user_uuid: string, language_code: string): Promise<FormulaResultResponse[]> {
    try {
      const userData = await this.personService.getPersonData(user_uuid)
      const userBirthday = `${userData.birthday_day}${userData.birthday_month}${userData.birthday_year}`

      const lifePathNumber = {
        number: getQuersumme(userBirthday).toString(),
      }
      const soulNumber = {
        number: getSoulNumber(userData.first_name).toString(),
      }

      const keys = [lifePathNumber, soulNumber]

      const pages = []
      for (const key of keys) {
        const page = await this.formulaResultService.findOneByKey(
          key.number.toString(),
          FormulaTypesEnum.PLANETS,
          language_code,
        )

        if (page) {
          page.formula_type = getLocalizedFormulaType(page.formula_type, language_code)
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

  async getAncestors(user_uuid: string, language_code: string): Promise<FormulaResultResponse[]> {
    try {
      const userData = await this.personService.getPersonData(user_uuid)

      const lastNameArcane = getArcane(getNameNumber(userData.last_name, false))

      const page = await this.formulaResultService.findOneByKey(
        lastNameArcane.toString(),
        FormulaTypesEnum.ANCESTORS,
        language_code,
      )

      if (page) {
        page.formula_type = getLocalizedFormulaType(page.formula_type, language_code)
        return [page]
      } else {
        throw new NotFoundException(await this.i18n.t('errors.page_not_found'))
      }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getTotemicAnimals(user_uuid: string, language_code: string): Promise<FormulaResultResponse[]> {
    try {
      const userData = await this.personService.getPersonData(user_uuid)

      const dateKey = {
        number: `${('0' + userData.birthday_day).slice(-2)}.${('0' + userData.birthday_month).slice(-2)}`,
      }
      const yearKey = { number: userData.birthday_year }
      const nameKey = {
        number: getQuersumme(getNameNumber(userData.first_name, false).toString()),
      }

      const keys = [dateKey, yearKey, nameKey]

      const pages = []
      for (const key of keys) {
        const page = await this.formulaResultService.findOneByKey(
          key.number.toString(),
          FormulaTypesEnum.TOTEMIC_ANIMAl,
          language_code,
        )

        if (page) {
          page.formula_type = getLocalizedFormulaType(page.formula_type, language_code)
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

  async getDestinyProgram(user_uuid: string, language_code: string): Promise<FormulaResultResponse[]> {
    try {
      const userData = await this.personService.getPersonData(user_uuid)
      const userBirthday = `${userData.birthday_day}${userData.birthday_month}${userData.birthday_year}`

      const dayTask = {
        number: getArcane(userData.birthday_day),
        type: FormulaTypesEnum.TASKS,
      }
      const monthTask = {
        number: userData.birthday_month,
        type: FormulaTypesEnum.TASKS,
      }
      const yearTask = {
        number: getLongNumberArcane(userData.birthday_year.toString()),
        type: FormulaTypesEnum.TASKS,
      }
      const communityTask = {
        number: getArcane(dayTask.number + monthTask.number + yearTask.number),
        type: FormulaTypesEnum.TASKS,
      }
      const nameKey = {
        number: getArcane(getNameNumber(userData.first_name, false)),
        type: FormulaTypesEnum.SECRET_OF_NAME,
      }
      const expressionNumberKey = {
        number: getQuersumme(
          getNameNumber(`${userData.first_name}${userData.last_name}${userData.patronymic}`, false, true).toString(),
        ),
        type: FormulaTypesEnum.EXPRESSION_NUMBER,
      }
      const lifePathNumber = {
        number: getQuersumme(userBirthday),
        type: FormulaTypesEnum.LIFE_PATH_NUMBER,
      }

      const keys = [dayTask, monthTask, yearTask, communityTask, nameKey, expressionNumberKey, lifePathNumber]

      const pages = []
      for (const key of keys) {
        const page = await this.formulaResultService.findOneByKey(key.number.toString(), key.type, language_code)

        if (page) {
          page.formula_type = getLocalizedFormulaType(page.formula_type, language_code)
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
        getNameNumber(`${userData.first_name}${userData.last_name}${userData.patronymic}`, false, true).toString(),
      )
      const lifePathNumber = getQuersumme(userBirthday)

      const keys = [dayTask, monthTask, yearTask, communityTask, nameKey, expressionNumberKey, lifePathNumber]

      return keys
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getKarma(user_uuid: string, language_code: string): Promise<FormulaResultResponse[]> {
    try {
      const userData = await this.personService.getPersonData(user_uuid)

      const yearArcane = getLongNumberArcane(userData.birthday_year.toString())
      const monthArcane = userData.birthday_month
      const dayArcane = getArcane(userData.birthday_day)

      const firstKarmicKnot = {
        number: getArcane(Math.abs(dayArcane - monthArcane)),
      }
      const secondKarmicKnot = {
        number: getArcane(Math.abs(dayArcane - yearArcane)),
      }
      const thirdKarmicKnot = {
        number: getArcane(Math.abs(monthArcane - yearArcane)),
      }

      const keys = [firstKarmicKnot, secondKarmicKnot, thirdKarmicKnot]

      const pages = []
      for (const key of keys) {
        const page = await this.formulaResultService.findOneByKey(
          key.number.toString(),
          FormulaTypesEnum.KARMA,
          language_code,
        )

        if (page) {
          page.formula_type = getLocalizedFormulaType(page.formula_type, language_code)
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

  async getBloodType(bloodType: string, language_code: string): Promise<FormulaResultResponse[]> {
    try {
      const page = await this.formulaResultService.findOneByKey(bloodType, FormulaTypesEnum.BLOOD_TYPE, language_code)

      if (page) {
        page.formula_type = getLocalizedFormulaType(page.formula_type, language_code)
      } else {
        Logger.error(`MISSING PAGE getBloodType: ${JSON.stringify(bloodType)}`)
      }

      if (!page) {
        throw new NotFoundException(await this.i18n.t('errors.data_not_found'))
      }
      return [page]
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getAngelicNumerology(time: string, language_code: string): Promise<FormulaResultResponse[]> {
    try {
      const page = await this.formulaResultService.findOneByKey(
        time,
        FormulaTypesEnum.ANGELIC_NUMEROLOGY,
        language_code,
      )

      if (page) {
        page.formula_type = getLocalizedFormulaType(page.formula_type, language_code)
      } else {
        Logger.error(`MISSING PAGE getAngelicNumerology: ${JSON.stringify(time)}`)
      }

      if (!page) {
        throw new NotFoundException(this.i18n.t('errors.angelic_data_not_found'))
      }
      return [page]
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getGuessingNumber(number: number, language_code: string): Promise<FormulaResultResponse[]> {
    try {
      const formattedNumber = `${number.toString()}3`
      const key = getLongNumberArcane(formattedNumber, 84)

      const page = await this.formulaResultService.findOneByKey(
        key.toString(),
        FormulaTypesEnum.GUESSING_NUMBER,
        language_code,
      )

      if (page) {
        page.formula_type = getLocalizedFormulaType(page.formula_type, language_code)
      } else {
        Logger.error(`MISSING PAGE getGuessingNumber: ${JSON.stringify(key)}`)
      }

      if (!page) {
        throw new NotFoundException(this.i18n.t('errors.data_not_found'))
      }
      return [page]
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getCompatibility(
    getCompatibilityDto: GetCompatibilityDto,
    language_code: string,
  ): Promise<FormulaResultResponse[]> {
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

      // const firstArcane = getLongNumberArcane(firstPartnerDate)
      // const secondArcane = getLongNumberArcane(secondPartnerDate)
      // const arcaneCompatibility = {
      //   number: getArcane(firstArcane + secondArcane),
      //   type: FormulaTypesEnum.ARCANE_COMPATIBILITY,
      // }

      const firstSoulNumber = getLongNumberArcane(firstPartnerDate, 9)
      const secondSoulNumber = getLongNumberArcane(secondPartnerDate, 9)
      const soulNumberCompatibility = {
        number: getLongNumberArcane((firstSoulNumber + secondSoulNumber).toString(), 9),
        type: FormulaTypesEnum.SOUL_NUMBER_COMPATIBILITY,
      }

      const firstTaskNumber = getArcane(firstDayArcane + firstMonthArcane + firstYearArcane)
      const secondTaskNumber = getArcane(secondDayArcane + secondMonthArcane + secondYearArcane)
      const tasksCompatibility = {
        number: getArcane(firstTaskNumber + secondTaskNumber),
        type: FormulaTypesEnum.JOINT_TASKS_COMPATIBILITY,
      }

      const firstDifficultyNumber = getArcane(firstDayArcane + firstMonthArcane)
      const secondDifficultyNumber = getArcane(secondDayArcane + secondMonthArcane)
      const difficultiesCompatibility = {
        number: getArcane(firstDifficultyNumber + secondDifficultyNumber),
        type: FormulaTypesEnum.DIFFICULTIES_COMPATIBILITY,
      }

      const keys = [
        //arcaneCompatibility,
        soulNumberCompatibility,
        tasksCompatibility,
        difficultiesCompatibility,
      ]

      const pages = []
      for (const key of keys) {
        const page = await this.formulaResultService.findOneByKey(key.number.toString(), key.type, language_code)

        if (page) {
          page.formula_type = getLocalizedFormulaType(page.formula_type, language_code)
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

  async getPersonalYearNumber(user_uuid: string, language_code: string): Promise<FormulaResultResponse[]> {
    try {
      const userData = await this.personService.getPersonData(user_uuid)
      const day = getQuersumme(userData.birthday_day.toString())
      const month = getQuersumme(userData.birthday_month.toString())
      const year = getQuersumme(new Date().getFullYear().toString())

      const formattedNumber = `${day}${month}${year}`
      const personalNumber = getQuersumme(formattedNumber)

      const page = await this.formulaResultService.findOneByKey(
        personalNumber.toString(),
        FormulaTypesEnum.PERSONAL_YEAR_NUMBER,
        language_code,
      )

      if (page) {
        page.formula_type = getLocalizedFormulaType(page.formula_type, language_code)
      } else {
        Logger.error(`MISSING PAGE getPersonalYearNumber: ${JSON.stringify(personalNumber)}`)
      }

      if (!page) {
        throw new NotFoundException(this.i18n.t('errors.data_not_found'))
      }
      return [page]
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getPhoneNumberCalculation(user_uuid: string, language_code: string): Promise<FormulaResultResponse[]> {
    try {
      const userData = await this.userService.findByUuid(user_uuid, false)
      const phoneKey = getQuersumme(userData.phone.replaceAll('+', ''))

      const page = await this.formulaResultService.findOneByKey(
        phoneKey.toString(),
        FormulaTypesEnum.PHONE_NUMBER_CALCULATION,
        language_code,
      )

      if (page) {
        page.formula_type = getLocalizedFormulaType(page.formula_type, language_code)
      } else {
        Logger.error(`MISSING PAGE getPhoneNumberCalculation: ${JSON.stringify(phoneKey)}`)
      }

      if (!page) {
        throw new NotFoundException(this.i18n.t('errors.data_not_found'))
      }
      return [page]
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getHouseNumberCalculation(number: number, language_code: string): Promise<FormulaResultResponse[]> {
    try {
      const houseKey = getQuersumme(number.toString())

      const page = await this.formulaResultService.findOneByKey(
        houseKey.toString(),
        FormulaTypesEnum.HOUSE_NUMBER_CALCULATION,
        language_code,
      )

      if (page) {
        page.formula_type = getLocalizedFormulaType(page.formula_type, language_code)
      } else {
        Logger.error(`MISSING PAGE getHouseNumberCalculation: ${JSON.stringify(houseKey)}`)
      }

      if (!page) {
        throw new NotFoundException(this.i18n.t('errors.data_not_found'))
      }
      return [page]
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getFateNumberGift(date: Date, language_code: string): Promise<FormulaResultResponse[]> {
    try {
      const formattedDate = `${date.getDate()}${date.getMonth() + 1}${date.getFullYear()}`
      const giftKey = getQuersumme(formattedDate)

      const page = await this.formulaResultService.findOneByKey(
        giftKey.toString(),
        FormulaTypesEnum.FATE_NUMBER_GIFTS,
        language_code,
      )

      if (page) {
        page.formula_type = getLocalizedFormulaType(page.formula_type, language_code)
      } else {
        Logger.error(`MISSING PAGE getFateNumberGift: ${JSON.stringify(giftKey)}`)
      }

      if (!page) {
        throw new NotFoundException(this.i18n.t('errors.data_not_found'))
      }
      return [page]
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getAromatherapy(user_uuid: string, language_code: string): Promise<FormulaResultResponse[]> {
    try {
      const userData = await this.personService.getPersonData(user_uuid)
      const userBirthday = `${userData.birthday_day}${userData.birthday_month}${userData.birthday_year}`

      const soulNumberKey = {
        number: getQuersumme(userBirthday),
        type: FormulaTypesEnum.SOUL_NUMBER_ESSENTIAL_OIL,
      }

      const dayArcaneKey = {
        number: getArcane(userData.birthday_day),
        type: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
      }

      const keys = [soulNumberKey, dayArcaneKey]

      const pages = []
      for (const key of keys) {
        const page = await this.formulaResultService.findOneByKey(key.number.toString(), key.type, language_code)

        if (page) {
          page.formula_type = getLocalizedFormulaType(page.formula_type, language_code)
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

  async getRunicFormulas(language_code: string): Promise<FormulaResultResponse[]> {
    try {
      const pages = await this.formulaResultService.findAllByType(FormulaTypesEnum.RUNIC_FORMULAS, language_code)

      for (const page of pages) {
        if (page) {
          page.formula_type = getLocalizedFormulaType(page.formula_type, language_code)
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

  async getGrahps(user_uuid: string, language_code: string): Promise<GraphDataResponse> {
    try {
      const userData = await this.personService.getPersonData(user_uuid)
      const userDay = userData.birthday_day < 10 ? `0${userData.birthday_day}` : userData.birthday_day.toString()
      const userMonth =
        userData.birthday_month < 10 ? `0${userData.birthday_month}` : userData.birthday_month.toString()
      const userDayMonth = `${userDay}${userMonth}`
      const userYear = `${userData.birthday_year}`

      const xCoords = ['0', '12', '24', '36', '48', '60', '72']

      let destinyKey = (Number(userDayMonth) * Number(userYear)).toString()
      if (Number(destinyKey) < 1000000) destinyKey = `0${destinyKey}`
      let volitionKey = (Number(userDayMonth.replaceAll('0', '1')) * Number(userYear.replaceAll('0', '1'))).toString()
      if (Number(volitionKey) < 1000000) volitionKey = `0${volitionKey}`

      const destinyCoords = destinyKey.split('')
      const destinyResponse = new GraphResponse()
      destinyResponse.y_coords = destinyCoords
      destinyResponse.x_coords = xCoords
      destinyResponse.graph_name = this.i18n.t('titles.destiny_graph')

      const volitionCoords = volitionKey.split('')
      const volitionResponse = new GraphResponse()
      volitionResponse.y_coords = volitionCoords
      volitionResponse.x_coords = xCoords
      volitionResponse.graph_name = this.i18n.t('titles.volition_graph')

      const pages = []

      // Положение графиков: выше, ниже или пересекаются
      let positionKey
      console.log('DESTINY: ', destinyCoords, 'VOLITION:', volitionCoords)
      if (destinyCoords.every((dy) => volitionCoords.every((vy) => Number(vy) > Number(dy)))) {
        positionKey = 'volition > destiny'
      } else if (destinyCoords.every((dy) => volitionCoords.every((vy) => Number(vy) < Number(dy)))) {
        positionKey = 'destiny > volition'
      } else {
        positionKey = 'cross'
      }

      const positionPage = await this.formulaResultService.findOneByKey(
        positionKey,
        FormulaTypesEnum.GRAPHS,
        language_code,
      )
      pages.push(positionPage)

      // Падение графика судьбы в ноль
      let zeroKey
      if (destinyCoords.some((dy) => Number(dy) == 0)) zeroKey = 'destiny-zero'
      // Падение графика воли в ноль
      if (volitionCoords.some((vy) => Number(vy) == 0)) zeroKey = 'volition-zero'

      if (zeroKey) {
        const zeroPage = await this.formulaResultService.findOneByKey(zeroKey, FormulaTypesEnum.GRAPHS, language_code)
        pages.push(zeroPage)
      }

      // Пересечение графиков со средней линией
      const comfortCoords: number[] = []
      for (let index = 0; index < destinyCoords.length; index++) {
        const dy = Number(destinyCoords[index])
        const vy = Number(volitionCoords[index])

        comfortCoords.push((dy + vy) / 2)
      }

      const comfortResponse = new GraphResponse()
      comfortResponse.y_coords = comfortCoords.map(String)
      comfortResponse.x_coords = xCoords
      comfortResponse.graph_name = this.i18n.t('titles.comfort_graph')

      let comfortKey

      // График судьбы пересекает линию комфорта
      let isDestinyIntersect = false
      for (let index = 0; index < comfortCoords.length; index++) {
        if (index < comfortCoords.length - 1) {
          const comfortY = comfortCoords[index]
          const destinyY = Number(destinyCoords[index])

          const comfortYNext = comfortCoords[index + 1]
          const destinyYNext = Number(destinyCoords[index + 1])

          isDestinyIntersect = checkIntersects(comfortY, destinyY, comfortYNext, destinyYNext)
          if (isDestinyIntersect == true) break
        }
      }

      // График воли пересекает линию комфорта
      let isVolitionIntersect = false
      for (let index = 0; index < comfortCoords.length; index++) {
        if (index < comfortCoords.length - 1) {
          const comfortY = comfortCoords[index]
          const volitionY = Number(volitionCoords[index])

          const comfortYNext = comfortCoords[index + 1]
          const volitionYNext = Number(volitionCoords[index + 1])

          isVolitionIntersect = checkIntersects(comfortY, volitionY, comfortYNext, volitionYNext)
          if (isVolitionIntersect == true) break
        }
      }

      if (isVolitionIntersect == true && isDestinyIntersect == true) {
        comfortKey = 'both-comfort-cross'
      } else if (isDestinyIntersect == true) {
        comfortKey = 'destiny-comfort-cross'
      } else if (isVolitionIntersect == true) {
        comfortKey = 'volition-comfort-cross'
      }

      if (comfortKey) {
        const comfortCrossPage = await this.formulaResultService.findOneByKey(
          comfortKey,
          FormulaTypesEnum.GRAPHS,
          language_code,
        )
        pages.push(comfortCrossPage)
      }

      // Пиковые высшие точки
      const destinyMax = Math.max(...destinyCoords.map(Number))
      const volitionMax = Math.max(...volitionCoords.map(Number))
      console.log('DESTINY MAX:', destinyMax)
      console.log('VOLITION MAX:', volitionMax)

      const linesPages = await this.formulaResultService.findAllByKeys(
        [
          'destiny-ascending-lines',
          'destiny-descending-lines',
          'volition-ascending-lines',
          'volition-descending-lines',
        ],
        FormulaTypesEnum.GRAPHS,
        language_code,
      )
      pages.push(...linesPages)

      const highestPointsPage = await this.formulaResultService.findOneByKey(
        'highest-point',
        FormulaTypesEnum.GRAPHS,
        language_code,
      )
      pages.push(highestPointsPage)

      for (const page of pages) {
        if (page) {
          page.formula_type = getLocalizedFormulaType(page.formula_type, language_code)
        }
      }

      return { graphs: [destinyResponse, volitionResponse, comfortResponse], results: pages }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
