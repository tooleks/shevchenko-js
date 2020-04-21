import GrammaticalCase from '../Core/GrammaticalCase';
import InflectorCommands from './InflectorCommands';

type GrammaticalCases = {
  [GrammaticalCase.Nominative]: InflectorCommands[],
  [GrammaticalCase.Genitive]: InflectorCommands[],
  [GrammaticalCase.Dative]: InflectorCommands[],
  [GrammaticalCase.Accusative]: InflectorCommands[],
  [GrammaticalCase.Ablative]: InflectorCommands[],
  [GrammaticalCase.Locative]: InflectorCommands[],
  [GrammaticalCase.Vocative]: InflectorCommands[],
};

export default GrammaticalCases;
