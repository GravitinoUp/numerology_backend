import { EnAlphabet, EnVowelLetters, RuAlphabet, RuVowelLetters } from '../constants/constants'

export function getQuersumme(value: string): number {
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

export function getNameNumber(
  name: string,
  onlyVowel: boolean = true,
  onlyConsonants: boolean = false,
): number {
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
    result += getLetterNumber(letter)
  }

  return result
}

export function getSoulNumber(firstName: string): number {
  const nameNumber = getNameNumber(firstName)
  const soulNumber = getQuersumme(nameNumber.toString())

  return soulNumber
}

export function getLetterNumber(letter: string): number {
  let letterNumber = RuAlphabet.indexOf(letter.toUpperCase()) + 1
  if (letterNumber == 0) {
    letterNumber = EnAlphabet.indexOf(letter.toUpperCase()) + 1
  }

  while (letterNumber > 9) {
    letterNumber -= 9
  }

  return letterNumber
}

export function getLongNumberArcane(value: string, maxNumber: number = 22): number {
  let arcane = 0
  for (const number of value) {
    arcane += Number(number)
  }

  while (arcane > maxNumber) {
    arcane = arcane - maxNumber
  }

  return arcane
}

export function getArcane(value: number): number {
  let arcane = value
  while (arcane > 22) {
    arcane -= 22
  }

  if (arcane == 0) arcane = 22

  return arcane
}
