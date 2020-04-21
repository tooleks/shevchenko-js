import InflectorRule from './InflectorRule';
import Gender from '../Core/Gender';
import GrammaticalCase from '../Core/GrammaticalCase';
import NameInflector from './NameInflector';
export default class FirstNameInflector extends NameInflector {
    private readonly rules;
    constructor(rules: InflectorRule[]);
    /**
     * @inheritdoc
     */
    protected inflectName(firstName: string, gender: Gender, grammaticalCase: GrammaticalCase): string;
}
