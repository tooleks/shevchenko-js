import { GrammaticalCase, GrammaticalGender } from '../language';
import { WordInflector } from '../word-declension';
import { NameInflector } from './name-inflector';

export class PatronymicNameInflector extends NameInflector {
  private readonly wordInflector: WordInflector;

  constructor(wordInflector: WordInflector) {
    super();
    this.wordInflector = wordInflector;
  }

  /**
   * @inheritdoc
   */
  protected inflectNamePart(
    patronymicName: string,
    gender: GrammaticalGender,
    grammaticalCase: GrammaticalCase,
  ): Promise<string> {
    return this.wordInflector.inflect(patronymicName, {
      grammaticalCase: grammaticalCase,
      gender: gender,
      applicationType: 'patronymicName',
      customRuleFilter: (declensionRule) =>
        declensionRule.applicationType.includes('patronymicName'),
    });
  }
}
