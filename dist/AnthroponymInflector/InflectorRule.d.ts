import Gender from '../Core/Gender';
import PartOfSpeech from '../Core/PartOfSpeech';
import GrammaticalCases from './GrammaticalCases';
import InflectorPattern from './InflectorPattern';
declare type InflectorRule = {
    description: string;
    partOfSpeech: PartOfSpeech;
    gender: Gender[];
    usage: string[];
    pattern: InflectorPattern;
    grammaticalCases: GrammaticalCases;
};
export default InflectorRule;
