/**
 * Ukrainian alphabet encoding where the key is the letter of the alphabet
 * and the value is the order number of the corresponding letter starting from 1.
 */
export enum AlphabetEncoding {
  'а' = 1,
  'б',
  'в',
  'г',
  'ґ',
  'д',
  'е',
  'є',
  'ж',
  'з',
  'и',
  'і',
  'ї',
  'й',
  'к',
  'л',
  'м',
  'н',
  'о',
  'п',
  'р',
  'с',
  'т',
  'у',
  'ф',
  'х',
  'ц',
  'ч',
  'ш',
  'щ',
  'ь',
  'ю',
  'я',
}

/**
 * Size of Ukrainian alphabet.
 */
export const ALPHABET_SIZE = 33;

/**
 * Letter of Ukrainian alphabet.
 */
export type Letter = keyof typeof AlphabetEncoding;
