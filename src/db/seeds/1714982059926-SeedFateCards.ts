import { FormulaTypesEnum } from 'src/common/constants/constants'
import { FormulaResult } from 'src/modules/formula-result/entities/formula-result.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedFateCards1714982059926 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(FormulaResult, [
      {
        formula_type_id: 2,
        result_keys: ['13.01', '11.02', '09.03', '07.04', '05.05', '03.06', '01.07'],
        result_name: 'Туз Пик',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: ['12.01', '10.02', '08.03', '06.04', '04.05', '02.06'],
        result_name: '2 Пик',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: ['11.01', '09.02', '07.03', '05.04', '03.05', '01.06'],
        result_name: '3 Пик',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: ['10.01', '08.02', '06.03', '04.04', ' 02.05'],
        result_name: '4 Пик',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: ['09.01', '07.02', '05.03', '03.04', '01.05'],
        result_name: '5 Пик',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: ['08.01', '06.02', '04.03', '02.04'],
        result_name: '6 Пик',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: ['07.01', '05.02', '03.03', '01.04'],
        result_name: '7 Пик',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: ['06.01', '04.02', '02.03'],
        result_name: '8 Пик',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: ['05.01', '03.02', '01.03'],
        result_name: '9 Пик',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: ['04.01', '02.02'],
        result_name: '10 Пик',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: ['03.01', '01.02'],
        result_name: 'Валет Пик',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: ['02.01'],
        result_name: 'Дама Пик',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: ['01.01'],
        result_name: 'Король Пик',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: ['31.05', '29.06', '27.07', '25.08', '23.09', '21.10', '19.11', '17.12'],
        result_name: 'Туз Треф',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: ['30.05', '28.06', '26.07', '24.08', '22.09', '20.10', '18.11', '16.12'],
        result_name: '2 Треф',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: ['29.05', '27.06', '25.07', '23.08', '21.09', '19.10', '17.11', '15.12'],
        result_name: '3 Треф',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: [
          '30.04',
          '28.05',
          '26.06',
          '24.07',
          '22.08',
          '20.09',
          '18.10',
          '16.11',
          '14.12',
        ],
        result_name: '4 Треф',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: [
          '31.03',
          '29.04',
          '27.05',
          '25.06',
          '23.07',
          '21.08',
          '19.09',
          '17.10',
          '15.11',
          '13.12',
        ],
        result_name: '5 Треф',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: [
          '30.03',
          '28.04',
          '26.05',
          '24.06',
          '22.07',
          '20.08',
          '18.09',
          '16.10',
          '14.11',
          '12.12',
        ],
        result_name: '6 Треф',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: [
          '29.03',
          '27.04',
          '25.05',
          '23.06',
          '21.07',
          '19.08',
          '17.09',
          '15.10',
          '13.11',
          '11.12',
        ],
        result_name: '7 Треф',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: [
          '28.03',
          '26.04',
          '24.05',
          '22.06',
          '20.07',
          '18.08',
          '16.09',
          '14.10',
          '12.11',
          '10.12',
        ],
        result_name: '8 Треф',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: [
          '31.01',
          '29.02',
          '27.03',
          '25.04',
          '23.05',
          '21.06',
          '19.07',
          '17.08',
          '15.09',
          '13.10',
          '11.11',
          '09.12',
        ],
        result_name: '9 Треф',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: [
          '30.01',
          '28.02',
          '26.03',
          '24.04',
          '22.05',
          '20.06',
          '18.07',
          '16.08',
          '14.09',
          '12.10',
          '10.11',
          '08.12',
        ],
        result_name: '10 Треф',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: [
          '29.01',
          '27.02',
          '25.03',
          '23.04',
          '21.05',
          '19.06',
          '17.07',
          '15.08',
          '13.09',
          '11.10',
          '09.11',
          '07.12',
        ],
        result_name: 'Валет Треф',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: [
          '28.01',
          '26.02',
          '24.03',
          '22.04',
          '20.05',
          '18.06',
          '16.07',
          '14.08',
          '12.09',
          '10.10',
          '08.11',
          '06.12',
        ],
        result_name: 'Дама Треф',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: [
          '27.01',
          '25.02',
          '23.03',
          '21.04',
          '19.05',
          '17.06',
          '15.07',
          '13.08',
          '11.09',
          '09.10',
          '07.11',
          '05.12',
        ],
        result_name: 'Король Треф',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: [
          '26.01',
          '24.02',
          '22.03',
          '20.04',
          '18.05',
          '16.06',
          '14.07',
          '12.08',
          '10.09',
          '08.10',
          '06.11',
          '04.12',
        ],
        result_name: 'Туз Бубен',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: [
          '25.01',
          '23.02',
          '21.03',
          '19.04',
          '17.05',
          '15.06',
          '13.07',
          '11.08',
          '09.09',
          '07.10',
          '05.11',
          '03.12',
        ],
        result_name: '2 Бубен',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: [
          '24.01',
          '22.02',
          '20.03',
          '18.04',
          '16.05',
          '14.06',
          '12.07',
          '10.08',
          '08.09',
          '06.10',
          '04.11',
          '02.12',
        ],
        result_name: '3 Бубен',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: [
          '23.01',
          '21.02',
          '19.03',
          '17.04',
          '15.05',
          '13.06',
          '11.07',
          '09.08',
          '07.09',
          '05.10',
          '03.11',
          '01.12',
        ],
        result_name: '4 Бубен',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: [
          '22.01',
          '20.02',
          '18.03',
          '16.04',
          '14.05',
          '12.06',
          '10.07',
          '08.08',
          '06.09',
          '04.10',
          '02.11',
        ],
        result_name: '5 Бубен',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: [
          '21.01',
          '19.02',
          '17.03',
          '15.04',
          '13.05',
          '11.06',
          '09.07',
          '07.08',
          '05.09',
          '03.10',
          '01.11',
        ],
        result_name: '6 Бубен',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: [
          '20.01',
          '18.02',
          '16.03',
          '14.04',
          '12.05',
          '10.06',
          '08.07',
          '06.08',
          '04.09',
          '02.10',
        ],
        result_name: '7 Бубен',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: [
          '19.01',
          '17.02',
          '15.03',
          '13.04',
          '11.05',
          '09.06',
          '07.07',
          '05.08',
          '03.09',
          '01.10',
        ],
        result_name: '8 Бубен',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: [
          '18.01',
          '16.02',
          '14.03',
          '12.04',
          '10.05',
          '08.06',
          '06.07',
          '04.08',
          '02.09',
        ],
        result_name: '9 Бубен',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: [
          '17.01',
          '15.02',
          '13.03',
          '11.04',
          '09.05',
          '07.06',
          '05.07',
          '03.08',
          '01.09',
        ],
        result_name: '10 Бубен',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: ['16.01', '14.02', '12.03', '10.04', '08.05', '06.06', '04.07', '02.08'],
        result_name: 'Валет Бубен',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: ['15.01', '13.02', '11.03', '09.04', '07.05', '05.06', '03.07', '01.08'],
        result_name: 'Дама Бубен',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: ['14.01', '12.02', '10.03', '08.04', '06.05', '04.06', '02.07'],
        result_name: 'Король Бубен',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: ['30.12'],
        result_name: 'Туз Червей',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: ['29.12'],
        result_name: '2 Червей',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: ['28.11', '28.12'],
        result_name: '3 Червей',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: ['31.10', '29.11', '27.12'],
        result_name: '4 Червей',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: ['30.10', '28.11', '26.12'],
        result_name: '5 Червей',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: ['29.10', '27.11', '25.12'],
        result_name: '6 Червей',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: ['30.09', '28.10', '26.11', '24.12'],
        result_name: '7 Червей',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: ['29.09', '27.10', '25.11', '23.12'],
        result_name: '8 Червей',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: ['30.08', '28.09', '26.10', '24.11', '22.12'],
        result_name: '9 Червей',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: ['31.07', '29.08', '27.09', '25.10', '23.11', '21.12'],
        result_name: '10 Червей',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: ['30.07', '28.08', '26.09', '24.10', '22.11', '20.12'],
        result_name: 'Валет Червей',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: ['29.07', '27.08', '25.09', '23.10', '21.11', '19.12'],
        result_name: 'Дама Червей',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: ['30.06', '28.07', '26.08', '24.09', '22.10', '20.11', '18.12'],
        result_name: 'Король Червей',
        result_content: '',
        language_code: 'ru',
      },
      {
        formula_type_id: 2,
        result_keys: ['31.12'],
        result_name: 'Джокер',
        result_content: '',
        language_code: 'ru',
      },
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(FormulaResult, { page_type_id: FormulaTypesEnum.FATE_CARDS })
  }
}
