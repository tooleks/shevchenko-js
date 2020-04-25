import GrammaticalCase from '../Core/GrammaticalCase';
import InflectorCommandGroup from './InflectorCommandGroup';

type GrammaticalCases = {
  [GrammaticalCase.Nominative]: InflectorCommandGroup[],
  [GrammaticalCase.Genitive]: InflectorCommandGroup[],
  [GrammaticalCase.Dative]: InflectorCommandGroup[],
  [GrammaticalCase.Accusative]: InflectorCommandGroup[],
  [GrammaticalCase.Ablative]: InflectorCommandGroup[],
  [GrammaticalCase.Locative]: InflectorCommandGroup[],
  [GrammaticalCase.Vocative]: InflectorCommandGroup[],
};

export default GrammaticalCases;
