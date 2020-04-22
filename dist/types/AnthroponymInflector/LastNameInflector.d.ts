import InflectorRule from './InflectorRule';
import Gender from '../Core/Gender';
import GrammaticalCase from '../Core/GrammaticalCase';
import PartOfSpeechRecognizer from '../PartOfSpeechRecognizer/PartOfSpeechRecognizer';
import NameInflector from './NameInflector';
export default class LastNameInflector extends NameInflector {
    private readonly rules;
    private readonly partOfSpeechRecognizer;
    constructor(rules: InflectorRule[], partOfSpeechRecognizer: PartOfSpeechRecognizer);
    /**
     * @inheritdoc
     */
    protected inflectName(lastName: string, gender: Gender, grammaticalCase: GrammaticalCase, isLastWord: boolean): string;
}
//# sourceMappingURL=LastNameInflector.d.ts.map