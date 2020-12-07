import { Gender } from './gender.enum';

export interface Anthroponym {
  gender: Gender;
  firstName?: string;
  middleName?: string;
  lastName?: string;
}
