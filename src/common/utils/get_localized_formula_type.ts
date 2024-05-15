import { FormulaType } from 'src/modules/formula-type/entities/formula-type.entity'

export default function getLocalizedFormulaType(value: FormulaType, language_code: string) {
  const result = Object.assign(value, {
    formula_type_name: JSON.parse(value.formula_type_name)[language_code] as string,
    formula_type_description: JSON.parse(value.formula_type_description)[language_code] as string,
  })

  return result
}
