import GrammaticalCase from '../Core/GrammaticalCase';
import Gender from '../Core/Gender';
export default abstract class NameInflector {
    /**
     * Inflects a given name in a given grammatical case.
     */
    inflect(name: string, gender: Gender, grammaticalCase: GrammaticalCase): string;
    /**
     * Inflects a given part of the name in a given grammatical case.
     */
    protected abstract inflectName(word: string, gender: Gender, grammaticalCase: GrammaticalCase, isLastWord: boolean): string;
}
