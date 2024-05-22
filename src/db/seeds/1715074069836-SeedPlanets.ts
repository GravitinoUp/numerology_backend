import { FormulaTypesEnum } from 'src/common/constants/constants'
import { FormulaResult } from 'src/modules/formula-result/entities/formula-result.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedPlanets1715074069836 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(FormulaResult, [
      {
        formula_type_id: FormulaTypesEnum.PLANETS,
        result_keys: ['1'],
        result_name: JSON.stringify({ ru: 'Солнце', en: 'Солнце' }),
        result_content: JSON.stringify({
          ru: 'Лидерство, авторитет, эго',
          en: 'Лидерство, авторитет, эго',
        }),
        result_image: '/files/uploads?path=uploads/images/planets/image-bg-sun.jpg',
      },
      {
        formula_type_id: FormulaTypesEnum.PLANETS,
        result_keys: ['2'],
        result_name: JSON.stringify({ ru: 'Луна', en: 'Луна' }),
        result_content: JSON.stringify({
          ru: 'Эмоциональность, чувствительность, интуиция',
          en: 'Эмоциональность, чувствительность, интуиция',
        }),
        result_image: '/files/uploads?path=uploads/images/planets/image-bg-moon.jpg',
      },
      {
        formula_type_id: FormulaTypesEnum.PLANETS,
        result_keys: ['3'],
        result_name: JSON.stringify({ ru: 'Юпитер', en: 'Юпитер' }),
        result_content: JSON.stringify({
          ru: 'Оптимизм, социальность, удача',
          en: 'Оптимизм, социальность, удача',
        }),
        result_image: '/files/uploads?path=uploads/images/planets/image-bg-jupiter.jpg',
      },
      {
        formula_type_id: FormulaTypesEnum.PLANETS,
        result_keys: ['4'],
        result_name: JSON.stringify({ ru: 'Уран', en: 'Уран' }),
        result_content: JSON.stringify({
          ru: 'Инновации, оригинальность, нестандартные подходы',
          en: 'Инновации, оригинальность, нестандартные подходы',
        }),
        result_image: '/files/uploads?path=uploads/images/planets/image-bg-uranus.jpg',
      },
      {
        formula_type_id: FormulaTypesEnum.PLANETS,
        result_keys: ['5'],
        result_name: JSON.stringify({ ru: 'Меркурий', en: 'Меркурий' }),
        result_content: JSON.stringify({
          ru: 'Коммуникабельность, адаптивность, интеллект',
          en: 'Коммуникабельность, адаптивность, интеллект',
        }),
        result_image: '/files/uploads?path=uploads/images/planets/image-bg-mercury.jpg',
      },
      {
        formula_type_id: FormulaTypesEnum.PLANETS,
        result_keys: ['6'],
        result_name: JSON.stringify({ ru: 'Венера', en: 'Венера' }),
        result_content: JSON.stringify({
          ru: 'Гармония, любовь, красота',
          en: 'Гармония, любовь, красота',
        }),
        result_image: '/files/uploads?path=uploads/images/planets/image-bg-venus.jpg',
      },
      {
        formula_type_id: FormulaTypesEnum.PLANETS,
        result_keys: ['7'],
        result_name: JSON.stringify({ ru: 'Нептун', en: 'Нептун' }),
        result_content: JSON.stringify({
          ru: 'Духовность, тайны, интуитивные способности',
          en: 'Духовность, тайны, интуитивные способности',
        }),
        result_image: '/files/uploads?path=uploads/images/planets/image-bg-neptun.jpg',
      },
      {
        formula_type_id: FormulaTypesEnum.PLANETS,
        result_keys: ['8'],
        result_name: JSON.stringify({ ru: 'Сатурн', en: 'Сатурн' }),
        result_content: JSON.stringify({
          ru: 'Ответственность, трудолюбие, материальные достижения',
          en: 'Ответственность, трудолюбие, материальные достижения',
        }),
        result_image: '/files/uploads?path=uploads/images/planets/image-bg-saturn.jpg',
      },
      {
        formula_type_id: FormulaTypesEnum.PLANETS,
        result_keys: ['9'],
        result_name: JSON.stringify({ ru: 'Марс', en: 'Марс' }),
        result_content: JSON.stringify({
          ru: 'Энергия, страсть, агрессия',
          en: 'Энергия, страсть, агрессия',
        }),
        result_image: '/files/uploads?path=uploads/images/planets/image-bg-mars.jpg',
      },
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(FormulaResult, { formula_type_id: FormulaTypesEnum.PLANETS })
  }
}
