import Gender from './Gender';

interface Anthroponym {
  gender: Gender;
  firstName?: string;
  middleName?: string;
  lastName?: string;
}

export default Anthroponym;
