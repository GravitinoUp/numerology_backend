import { FormulaTypesEnum } from 'src/common/constants/constants'
import { FormulaResult } from 'src/modules/formula-result/entities/formula-result.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedBloodType1715765159386 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(FormulaResult, [
      {
        formula_type_id: FormulaTypesEnum.BLOOD_TYPE,
        result_keys: ['1'],
        result_name: JSON.stringify({ ru: 'Первая группа крови I', en: 'Первая группа крови I' }),
        result_content: JSON.stringify({
          ru: `1. *Лидерские качества*: Люди с первой группой крови часто описываются как решительные, самостоятельные и рожденные лидеры.

          2. *Уверенность*: Они могут проявлять уверенность в себе и независимость, быть стойкими и сильными в сложных ситуациях.
          
          3. *Ответственность*: Часто берут на себя ответственность и могут быть очень дисциплинированными.
          
          4. *Страсть*: Проявляют страсть и интенсивность в личных и профессиональных делах, эмоциональны в выражении своих чувств.
          
          5. *Прямолинейность*: Имеют тенденцию быть прямыми в общении, что может быть воспринято как откровенность или недостаток такта.
          
          6. *Оптимизм*: Они склонны к оптимизму и имеют сильное желание идти вперед, несмотря на препятствия.
          
          7. *Конкурентоспособность*: Могут быть очень конкурентоспособными и стремиться к победе в различных аспектах жизни.
          `,
          en: `1. *Лидерские качества*: Люди с первой группой крови часто описываются как решительные, самостоятельные и рожденные лидеры.

          2. *Уверенность*: Они могут проявлять уверенность в себе и независимость, быть стойкими и сильными в сложных ситуациях.
          
          3. *Ответственность*: Часто берут на себя ответственность и могут быть очень дисциплинированными.
          
          4. *Страсть*: Проявляют страсть и интенсивность в личных и профессиональных делах, эмоциональны в выражении своих чувств.
          
          5. *Прямолинейность*: Имеют тенденцию быть прямыми в общении, что может быть воспринято как откровенность или недостаток такта.
          
          6. *Оптимизм*: Они склонны к оптимизму и имеют сильное желание идти вперед, несмотря на препятствия.
          
          7. *Конкурентоспособность*: Могут быть очень конкурентоспособными и стремиться к победе в различных аспектах жизни.
          `,
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.BLOOD_TYPE,
        result_keys: ['2'],
        result_name: JSON.stringify({ ru: 'Вторая группа крови II', en: 'Вторая группа крови II' }),
        result_content: JSON.stringify({
          ru: `1. *Сдержанность*: Люди с группой крови A часто описываются как сдержанные и контролируемые в выражении своих эмоций.

        2. *Внимательность к деталям*: Они могут проявлять тщательность и внимание к мелочам, будь то на работе или в личной жизни.
        
        3. *Ответственность*: Такие люди часто ответственны и серьёзно подходят к поставленным задачам и обязанностям.
        
        4. *Сочувствие*: Им приписывают высокий уровень эмпатии и способность сочувствовать другим.
        
        5. *Консерватизм*: Люди с этой группой крови могут быть склонны к консервативным взглядам и предпочтению стабильности и порядка.
        
        6. *Стрессоустойчивость*: Они могут быть склонны к стрессу из-за своего стремления к совершенству и высоким стандартам.
        
        7. *Организованность*: Часто демонстрируют хорошую организованность и умение планировать своё время и деятельность.
        
        8. *Преданность*: Могут быть очень преданными в отношениях и на работе, серьезно относясь к своим обязательствам.        
          `,
          en: `1. *Сдержанность*: Люди с группой крови A часто описываются как сдержанные и контролируемые в выражении своих эмоций.

        2. *Внимательность к деталям*: Они могут проявлять тщательность и внимание к мелочам, будь то на работе или в личной жизни.
        
        3. *Ответственность*: Такие люди часто ответственны и серьёзно подходят к поставленным задачам и обязанностям.
        
        4. *Сочувствие*: Им приписывают высокий уровень эмпатии и способность сочувствовать другим.
        
        5. *Консерватизм*: Люди с этой группой крови могут быть склонны к консервативным взглядам и предпочтению стабильности и порядка.
        
        6. *Стрессоустойчивость*: Они могут быть склонны к стрессу из-за своего стремления к совершенству и высоким стандартам.
        
        7. *Организованность*: Часто демонстрируют хорошую организованность и умение планировать своё время и деятельность.
        
        8. *Преданность*: Могут быть очень преданными в отношениях и на работе, серьезно относясь к своим обязательствам.        
          `,
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.BLOOD_TYPE,
        result_keys: ['3'],
        result_name: JSON.stringify({
          ru: 'Третья группа крови III',
          en: 'Третья группа крови III',
        }),
        result_content: JSON.stringify({
          ru: `1. *Независимость*: Люди с группой крови B часто описываются как независимые и самодостаточные, предпочитающие следовать своим собственным правилам.

        2. *Гибкость*: Им приписывают способность легко адаптироваться к новым условиям и изменениям, благодаря чему они могут легко справляться с новыми ситуациями.
        
        3. *Творческий подход*: Часто считается, что люди с этой группой крови обладают высокой степенью творчества и оригинального мышления.
        
        4. *Эмоциональность*: Могут проявлять эмоциональную реактивность и страсть в личных и профессиональных отношениях.
        
        5. *Социальность*: Люди с группой крови B обычно описываются как общительные, они легко заводят новые знакомства.
        
        6. *Непредсказуемость*: Их поведение может быть иногда непредсказуемым, поскольку они склонны действовать спонтанно.
        
        7. *Стремление к балансу*: Имеют способность находить баланс между работой и личной жизнью, стремясь к гармонии.
        
        8. *Неприятие стандартов*: Могут проявлять сопротивление нормам и стандартам, предпочитая более свободный и нестандартный подход к жизни.
        `,
          en: `1. *Независимость*: Люди с группой крови B часто описываются как независимые и самодостаточные, предпочитающие следовать своим собственным правилам.

        2. *Гибкость*: Им приписывают способность легко адаптироваться к новым условиям и изменениям, благодаря чему они могут легко справляться с новыми ситуациями.
        
        3. *Творческий подход*: Часто считается, что люди с этой группой крови обладают высокой степенью творчества и оригинального мышления.
        
        4. *Эмоциональность*: Могут проявлять эмоциональную реактивность и страсть в личных и профессиональных отношениях.
        
        5. *Социальность*: Люди с группой крови B обычно описываются как общительные, они легко заводят новые знакомства.
        
        6. *Непредсказуемость*: Их поведение может быть иногда непредсказуемым, поскольку они склонны действовать спонтанно.
        
        7. *Стремление к балансу*: Имеют способность находить баланс между работой и личной жизнью, стремясь к гармонии.
        
        8. *Неприятие стандартов*: Могут проявлять сопротивление нормам и стандартам, предпочитая более свободный и нестандартный подход к жизни.
        `,
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.BLOOD_TYPE,
        result_keys: ['4'],
        result_name: JSON.stringify({
          ru: 'Четвертая группа крови IV',
          en: 'Четвертая группа крови IV',
        }),
        result_content: JSON.stringify({
          ru: `1. *Комплексный подход*: Люди с группой крови AB часто рассматриваются как сочетание черт групп A и B, что может делать их уникальными и многогранными личностями.

        2. *Дипломатичность*: Они обычно считаются дипломатами, способными понимать разные точки зрения и находить общий язык с различными людьми.
        
        3. *Интуитивность*: Людям с группой крови AB приписывают высокий уровень интуиции и эмпатии, что помогает им в социальных взаимодействиях.
        
        4. *Аналитический ум*: Они могут проявлять аналитическое мышление и способность разбираться в сложных вопросах и ситуациях.
        
        5. *Спокойствие и контроль*: Часто считается, что люди с этой группой крови способны сохранять спокойствие и самообладание в стрессовых ситуациях.
        
        6. *Избирательность в общении*: Они могут быть более скрытны и избирательны в выборе друзей и партнеров.
        
        7. *Творческий потенциал*: Им часто приписывают творческие способности и оригинальное видение мира.
        
        8. *Адаптивность*: Люди с группой крови AB обычно хорошо адаптируются к изменениям и могут быть гибкими в неожиданных обстоятельствах.
        `,
          en: `1. *Комплексный подход*: Люди с группой крови AB часто рассматриваются как сочетание черт групп A и B, что может делать их уникальными и многогранными личностями.

        2. *Дипломатичность*: Они обычно считаются дипломатами, способными понимать разные точки зрения и находить общий язык с различными людьми.
        
        3. *Интуитивность*: Людям с группой крови AB приписывают высокий уровень интуиции и эмпатии, что помогает им в социальных взаимодействиях.
        
        4. *Аналитический ум*: Они могут проявлять аналитическое мышление и способность разбираться в сложных вопросах и ситуациях.
        
        5. *Спокойствие и контроль*: Часто считается, что люди с этой группой крови способны сохранять спокойствие и самообладание в стрессовых ситуациях.
        
        6. *Избирательность в общении*: Они могут быть более скрытны и избирательны в выборе друзей и партнеров.
        
        7. *Творческий потенциал*: Им часто приписывают творческие способности и оригинальное видение мира.
        
        8. *Адаптивность*: Люди с группой крови AB обычно хорошо адаптируются к изменениям и могут быть гибкими в неожиданных обстоятельствах.
        `,
        }),
      },
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(FormulaResult, {
      formula_type_id: FormulaTypesEnum.BLOOD_TYPE,
    })
  }
}
