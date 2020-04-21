import Gender from '../Core/Gender';
import PartOfSpeech from '../Core/PartOfSpeech';
import GrammaticalCases from './GrammaticalCases';
import InflectorPattern from './InflectorPattern';

type InflectorRule = {
  description: string,
  examples: string[],
  partOfSpeech: PartOfSpeech,
  gender: Gender[],
  priority: number,
  usage: string[],
  pattern: InflectorPattern,
  grammaticalCases: GrammaticalCases,
};

export default InflectorRule;
