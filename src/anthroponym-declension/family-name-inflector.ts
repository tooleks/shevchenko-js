import { GrammaticalCase, GrammaticalGender, isMonosyllable } from '../language';
import { WordInflector } from '../word-declension';
import { FamilyNameClassifier } from './family-name-classifier';
import { NameInflector } from './name-inflector';

const UNKNOWN_FEMININE_WORD_CLASS_PATTERN = /[ая]$/i;
const UNKNOWN_MASCULINE_WORD_CLASS_PATTERN = /(ой|ий|ій|их)$/i;

export class FamilyNameInflector extends NameInflector {
  private readonly wordInflector: WordInflector;
  private readonly familyNameClassifier: FamilyNameClassifier;

  constructor(wordInflector: WordInflector, familyNameClassifier: FamilyNameClassifier) {
    super();
    this.wordInflector = wordInflector;
    this.familyNameClassifier = familyNameClassifier;
  }

  /**
   * @inheritdoc
   */
  protected async inflectNamePart(
    familyName: string,
    gender: GrammaticalGender,
    grammaticalCase: GrammaticalCase,
    isLastWord: boolean,
  ): Promise<string> {
    if (!isLastWord && isMonosyllable(familyName)) {
      return familyName;
    }

    return this.wordInflector.inflect(familyName, {
      grammaticalCase: grammaticalCase,
      gender: gender,
      application: 'familyName',
      filter: async (declensionRule) => {
        const uknownWordClass =
          (gender === GrammaticalGender.FEMININE &&
            UNKNOWN_FEMININE_WORD_CLASS_PATTERN.test(familyName)) ||
          (gender === GrammaticalGender.MASCULINE &&
            UNKNOWN_MASCULINE_WORD_CLASS_PATTERN.test(familyName));

        if (uknownWordClass) {
          const familyNameClass = await this.familyNameClassifier.classify(familyName);
          return declensionRule.wordClass === familyNameClass.wordClass;
        }

        return true;
      },
    });
  }
}
