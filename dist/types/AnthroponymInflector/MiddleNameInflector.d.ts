import InflectorRule from './InflectorRule';
import Gender from '../Core/Gender';
import GrammaticalCase from '../Core/GrammaticalCase';
import NameInflector from './NameInflector';
export default class MiddleNameInflector extends NameInflector {
    private readonly rules;
    constructor(rules: InflectorRule[]);
    /**
     * @inheritdoc
     */
    protected inflectName(middleName: string, gender: Gender, grammaticalCase: GrammaticalCase): string;
}
//# sourceMappingURL=MiddleNameInflector.d.ts.map