import { FormulaTypesEnum } from 'src/common/constants/constants'
import { FormulaResult } from 'src/modules/formula-result/entities/formula-result.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedAnimals1715161323519 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(FormulaResult, [
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: [
          '21.03',
          '22.03',
          '23.03',
          '24.03',
          '25.03',
          '26.03',
          '27.03',
          '28.03',
          '29.03',
          '30.03',
          '31.03',
          '01.04',
          '02.04',
          '03.04',
          '04.04',
          '05.04',
          '06.04',
          '07.04',
          '08.04',
          '09.04',
          '10.04',
          '11.04',
          '12.04',
          '13.04',
          '14.04',
          '15.04',
          '16.04',
          '17.04',
          '18.04',
          '19.04',
          '1905',
          '1937',
          '1969',
          '2001',
          '2033',
        ],
        result_name: JSON.stringify({ ru: 'Сокол', en: 'Сокол' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-falcon.png',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: [
          '20.04',
          '21.04',
          '22.04',
          '23.04',
          '24.04',
          '25.04',
          '26.04',
          '27.04',
          '28.04',
          '29.04',
          '30.04',
          '01.05',
          '02.05',
          '03.05',
          '04.05',
          '05.05',
          '06.05',
          '07.05',
          '08.05',
          '09.05',
          '10.05',
          '11.05',
          '12.05',
          '13.05',
          '14.05',
          '15.05',
          '16.05',
          '17.05',
          '18.05',
          '19.05',
          '20.05',
          '1913',
          '1945',
          '1977',
          '2009',
          '2041',
        ],
        result_name: JSON.stringify({ ru: 'Бобр', en: 'Бобр' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-beaver.png',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: [
          '21.05',
          '22.05',
          '23.05',
          '24.05',
          '25.05',
          '26.05',
          '27.05',
          '28.05',
          '29.05',
          '30.05',
          '31.05',
          '01.06',
          '02.06',
          '03.06',
          '04.06',
          '05.06',
          '06.06',
          '07.06',
          '08.06',
          '09.06',
          '10.06',
          '11.06',
          '12.06',
          '13.06',
          '14.06',
          '15.06',
          '16.06',
          '17.06',
          '18.06',
          '19.06',
          '20.06',
          '1906',
          '1938',
          '1970',
          '2002',
          '2034',
        ],
        result_name: JSON.stringify({ ru: 'Олень', en: 'Олень' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-deer.png',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: [
          '21.06',
          '22.06',
          '23.06',
          '24.06',
          '25.06',
          '26.06',
          '27.06',
          '28.06',
          '29.06',
          '30.06',
          '01.07',
          '02.07',
          '03.07',
          '04.07',
          '05.07',
          '06.07',
          '07.07',
          '08.07',
          '09.07',
          '10.07',
          '11.07',
          '12.07',
          '13.07',
          '14.07',
          '15.07',
          '16.07',
          '17.07',
          '18.07',
          '19.07',
          '20.07',
          '21.07',
        ],
        result_name: JSON.stringify({ ru: 'Дятел', en: 'Дятел' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-woodpecker.png',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: [
          '22.07',
          '23.07',
          '24.07',
          '25.07',
          '26.07',
          '27.07',
          '28.07',
          '29.07',
          '30.07',
          '31.07',
          '01.08',
          '02.08',
          '03.08',
          '04.08',
          '05.08',
          '06.08',
          '07.08',
          '08.08',
          '09.08',
          '10.08',
          '11.08',
          '12.08',
          '13.08',
          '14.08',
          '15.08',
          '16.08',
          '17.08',
          '18.08',
          '19.08',
          '20.08',
          '21.08',
        ],
        result_name: JSON.stringify({ ru: 'Лосось', en: 'Лосось' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-salmon.png',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: [
          '22.08',
          '23.08',
          '24.08',
          '25.08',
          '26.08',
          '27.08',
          '28.08',
          '29.08',
          '30.08',
          '31.08',
          '01.09',
          '02.09',
          '03.09',
          '04.09',
          '05.09',
          '06.09',
          '07.09',
          '08.09',
          '09.09',
          '10.09',
          '11.09',
          '12.09',
          '13.09',
          '14.09',
          '15.09',
          '16.09',
          '17.09',
          '18.09',
          '19.09',
          '20.09',
          '21.09',
        ],
        result_name: JSON.stringify({ ru: 'Медведь', en: 'Медведь' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-bear.png',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: [
          '22.09',
          '23.09',
          '24.09',
          '25.09',
          '26.09',
          '27.09',
          '28.09',
          '29.09',
          '30.09',
          '01.10',
          '02.10',
          '03.10',
          '04.10',
          '05.10',
          '06.10',
          '07.10',
          '08.10',
          '09.10',
          '10.10',
          '11.10',
          '12.10',
          '13.10',
          '14.10',
          '15.10',
          '16.10',
          '17.10',
          '18.10',
          '19.10',
          '20.10',
          '21.10',
          '22.10',
          '1917',
          '1949',
          '1981',
          '2013',
          '2045',
        ],
        result_name: JSON.stringify({ ru: 'Ворон', en: 'Ворон' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-raven.png',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: [
          '23.10',
          '24.10',
          '25.10',
          '26.10',
          '27.10',
          '28.10',
          '29.10',
          '30.10',
          '31.10',
          '01.11',
          '02.11',
          '03.11',
          '04.11',
          '05.11',
          '06.11',
          '07.11',
          '08.11',
          '09.11',
          '10.11',
          '11.11',
          '12.11',
          '13.11',
          '14.11',
          '15.11',
          '16.11',
          '17.11',
          '18.11',
          '19.11',
          '20.11',
          '21.11',
          '22.11',
          '1912',
          '1944',
          '1976',
          '2008',
          '2040',
        ],
        result_name: JSON.stringify({ ru: 'Змея', en: 'Змея' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-snake.png',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: [
          '23.11',
          '24.11',
          '25.11',
          '26.11',
          '27.11',
          '28.11',
          '29.11',
          '30.11',
          '01.12',
          '02.12',
          '03.12',
          '04.12',
          '05.12',
          '06.12',
          '07.12',
          '08.12',
          '09.12',
          '10.12',
          '11.12',
          '12.12',
          '13.12',
          '14.12',
          '15.12',
          '16.12',
          '17.12',
          '18.12',
          '19.12',
          '20.12',
          '21.12',
          '1904',
          '1936',
          '1968',
          '2000',
          '2032',
        ],
        result_name: JSON.stringify({ ru: 'Сова', en: 'Сова' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-owl.png',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: [
          '22.12',
          '23.12',
          '24.12',
          '25.12',
          '26.12',
          '27.12',
          '28.12',
          '29.12',
          '30.12',
          '31.12',
          '01.01',
          '02.01',
          '03.01',
          '04.01',
          '05.01',
          '06.01',
          '07.01',
          '08.01',
          '09.01',
          '10.01',
          '11.01',
          '12.01',
          '13.01',
          '14.01',
          '15.01',
          '16.01',
          '17.01',
          '18.01',
          '19.01',
        ],
        result_name: JSON.stringify({ ru: 'Снежный гусь', en: 'Снежный гусь' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-snow-goose.png',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: [
          '20.01',
          '21.01',
          '22.01',
          '23.01',
          '24.01',
          '25.01',
          '26.01',
          '27.01',
          '28.01',
          '29.01',
          '30.01',
          '31.01',
          '01.02',
          '02.02',
          '03.02',
          '04.02',
          '05.02',
          '06.02',
          '07.02',
          '08.02',
          '09.02',
          '10.02',
          '11.02',
          '12.02',
          '13.02',
          '14.02',
          '15.02',
          '16.02',
          '17.02',
          '18.02',
        ],
        result_name: JSON.stringify({ ru: 'Выдра', en: 'Выдра' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-otter.png',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: [
          '19.02',
          '20.02',
          '21.02',
          '22.02',
          '23.02',
          '24.02',
          '25.02',
          '26.02',
          '27.02',
          '28.02',
          '29.02',
          '01.03',
          '02.03',
          '03.03',
          '04.03',
          '05.03',
          '06.03',
          '07.03',
          '08.03',
          '09.03',
          '10.03',
          '11.03',
          '12.03',
          '13.03',
          '14.03',
          '15.03',
          '16.03',
          '17.03',
          '18.03',
          '19.03',
          '20.03',
          '1909',
          '1941',
          '1973',
          '2005',
          '2037',
        ],
        result_name: JSON.stringify({ ru: 'Волк', en: 'Волк' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-wolf.png',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['1907', '1939', '1971', '2003', '2035'],
        result_name: JSON.stringify({ ru: 'Баран', en: 'Баран' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-ram.png',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['1908', '1940', '1972', '2004', '2036'],
        result_name: JSON.stringify({ ru: 'Мангуст', en: 'Мангуст' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-mongoose.png',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['1910', '1942', '1974', '2006', '2038'],
        result_name: JSON.stringify({ ru: 'Аист', en: 'Аист' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-stork.png',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['1911', '1943', '1975', '2007', '2039'],
        result_name: JSON.stringify({ ru: 'Паук', en: 'Паук' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-spider.png',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['1914', '1946', '1978', '2010', '2042'],
        result_name: JSON.stringify({ ru: 'Черепаха', en: 'Черепаха' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-turtle.png',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['1915', '1947', '1979', '2011', '2043'],
        result_name: JSON.stringify({ ru: 'Сорока', en: 'Сорока' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-magpie.png',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['1916', '1948', '1980', '2012', '2044'],
        result_name: JSON.stringify({ ru: 'Белка', en: 'Белка' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-squirrel.png',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['1918', '1950', '1982', '2014', '2046'],
        result_name: JSON.stringify({ ru: 'Петух', en: 'Петух' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-cock.png',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['1919', '1951', '1983', '2015', '2047'],
        result_name: JSON.stringify({ ru: 'Тур/Бык', en: 'Тур/Бык' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-bull.png',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['1920', '1952', '1984', '2016', '2048'],
        result_name: JSON.stringify({ ru: 'Барсук', en: 'Барсук' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-badger.png',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['1921', '1953', '1985', '2017', '2049'],
        result_name: JSON.stringify({ ru: 'Верблюд', en: 'Верблюд' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-camel.png',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['1922', '1954', '1986', '2018', '2050'],
        result_name: JSON.stringify({ ru: 'Ёж', en: 'Ёж' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-hedgehog.png',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['1923', '1955', '1987', '2019', '2051'],
        result_name: JSON.stringify({ ru: 'Лань', en: 'Лань' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-doe.png',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['1924', '1956', '1988', '2020', '2052'],
        result_name: JSON.stringify({ ru: 'Слон', en: 'Слон' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-elephant.png',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['1925', '1957', '1989', '2021', '2053'],
        result_name: JSON.stringify({ ru: 'Конь/Лошадь', en: 'Конь/Лошадь' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-horse.png',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['1926', '1958', '1990', '2022', '2054'],
        result_name: JSON.stringify({ ru: 'Гепард', en: 'Гепард' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-cheetah.png',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['1927', '1959', '1991', '2023', '2055'],
        result_name: JSON.stringify({ ru: 'Павлин', en: 'Павлин' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-peacock.png',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['1928', '1960', '1992', '2024', '2056'],
        result_name: JSON.stringify({ ru: 'Лебедь', en: 'Лебедь' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-swan.png',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['1929', '1961', '1993', '2025', '2057'],
        result_name: JSON.stringify({ ru: 'Рысь/Соловей', en: 'Рысь/Соловей' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-lynx.png',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['1930', '1962', '1994', '2026', '2058'],
        result_name: JSON.stringify({ ru: 'Осёл', en: 'Осёл' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-donkey.png',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['1931', '1963', '1995', '2027', '2059'],
        result_name: JSON.stringify({ ru: 'Белый Медведь', en: 'Белый Медведь' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-white-bear.png',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['1900', '1932', '1964', '1996', '2028'],
        result_name: JSON.stringify({ ru: 'Орёл', en: 'Орёл' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-eagle.png',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['1901', '1933', '1965', '1997', '2029'],
        result_name: JSON.stringify({ ru: 'Лисица', en: 'Лисица' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-fox.png',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['1902', '1934', '1966', '1998', '2030'],
        result_name: JSON.stringify({ ru: 'Дельфин', en: 'Дельфин' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-dolphin.png',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['1903', '1935', '1967', '1999', '2031'],
        result_name: JSON.stringify({ ru: 'Вепрь', en: 'Вепрь' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-boar.png',
      },
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(FormulaResult, {
      formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
    })
  }
}
