import { Gender } from './grammatical-gender';

/**
 * @see {@link https://en.wikipedia.org/wiki/Given_name}
 * @see {@link https://en.wikipedia.org/wiki/Patronymic}
 * @see {@link https://en.wikipedia.org/wiki/Surname}
 */
export interface Anthroponym {
  gender: Gender;
  firstName?: string;
  middleName?: string;
  lastName?: string;
}
