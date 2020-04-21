import Anthroponym from '../Core/Anthroponym';
import GrammaticalCase from '../Core/GrammaticalCase';
import FirstNameInflector from './FirstNameInflector';
import MiddleNameInflector from './MiddleNameInflector';
import LastNameInflector from './LastNameInflector';
export default class AnthroponymInflector {
    private readonly firstNameInflector;
    private readonly middleNameInflector;
    private readonly lastNameInflector;
    constructor(firstNameInflector: FirstNameInflector, middleNameInflector: MiddleNameInflector, lastNameInflector: LastNameInflector);
    /**
     * Inflects a given anthroponym in a given grammatical case.
     */
    inflect(anthroponym: Anthroponym, grammaticalCase: GrammaticalCase): Anthroponym;
}
