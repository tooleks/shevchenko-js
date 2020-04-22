export default class AnthroponymInflector {
    // tslint:disable-next-line max-line-length
    constructor(firstNameInflector, middleNameInflector, lastNameInflector) {
        this.firstNameInflector = firstNameInflector;
        this.middleNameInflector = middleNameInflector;
        this.lastNameInflector = lastNameInflector;
    }
    /**
     * Inflects a given anthroponym in a given grammatical case.
     */
    inflect(anthroponym, grammaticalCase) {
        const result = { gender: anthroponym.gender };
        if (anthroponym.firstName != null) {
            result.firstName = this.firstNameInflector.inflect(anthroponym.firstName, anthroponym.gender, grammaticalCase);
        }
        if (anthroponym.middleName != null) {
            result.middleName = this.middleNameInflector.inflect(anthroponym.middleName, anthroponym.gender, grammaticalCase);
        }
        if (anthroponym.lastName != null) {
            result.lastName = this.lastNameInflector.inflect(anthroponym.lastName, anthroponym.gender, grammaticalCase);
        }
        return result;
    }
}
//# sourceMappingURL=AnthroponymInflector.js.map