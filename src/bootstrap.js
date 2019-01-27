import {
  INFLECTION_RULES,
  POS_NN_A_YA_STRUCTURE,
  POS_NN_A_YA_CACHE,
  POS_NN_OI_YI_II_STRUCTURE,
  POS_NN_OI_YI_II_CACHE,
  POS_NN_YH_STRUCTURE,
  POS_NN_YH_CACHE,
} from './config';
import AnthroponymInflector from './services/inflector/AnthroponymInflector';
import FirstNameInflector from './services/inflector/FirstNameInflector';
import LastNameInflector from './services/inflector/LastNameInflector';
import MiddleNameInflector from './services/inflector/MiddleNameInflector';
import RuleInflector from './services/inflector/RuleInflector';
import Recognizer from './services/pos/Recognizer';
import RecognizerRule from './services/pos/RecognizerRule';

const posRecognizer = new Recognizer([
  // The part of speech recognizer for female last names with endings "-a", "-я".
  new RecognizerRule(
    (word, gender) => gender.isFemale() && /[ая]$/i.test(word),
    POS_NN_A_YA_STRUCTURE,
    POS_NN_A_YA_CACHE,
  ),
  // The part of speech recognizer for male last names with endings "-ой", "-ий", "-ій".
  new RecognizerRule(
    (word, gender) => gender.isMale() && /(ой|ий|ій)$/i.test(word),
    POS_NN_OI_YI_II_STRUCTURE,
    POS_NN_OI_YI_II_CACHE,
  ),
  // The part of speech recognizer for male last names with endings "-их".
  new RecognizerRule((word, gender) => gender.isMale() && /(их)$/i.test(word), POS_NN_YH_STRUCTURE, POS_NN_YH_CACHE),
]);

const ruleInflector = new RuleInflector();
const firstNameInflector = new FirstNameInflector(ruleInflector, INFLECTION_RULES);
const middleNameInflector = new MiddleNameInflector(ruleInflector, INFLECTION_RULES);
const lastNameInflector = new LastNameInflector(ruleInflector, INFLECTION_RULES, posRecognizer);

const anthroponymInflector = new AnthroponymInflector(firstNameInflector, middleNameInflector, lastNameInflector);

export {anthroponymInflector};
