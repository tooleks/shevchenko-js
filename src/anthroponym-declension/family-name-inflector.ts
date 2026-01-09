import { GrammaticalCase, GrammaticalGender, isMonosyllable } from '../language';
import { WordInflector } from '../word-declension';
import { FamilyNameClass, FamilyNameClassifier } from './family-name-classifier';
import { NameInflector } from './name-inflector';

const UNCERTAIN_FEMININE_FAMILY_NAME_PATTERN = /^(?!\d).*?[ая]$/i;
const UNCERTAIN_MASCULINE_FAMILY_NAME_PATTERN = /(ой|ий|ій|их)$/i;

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

    let familyNameClass: FamilyNameClass | null = null;
    if (this.isUncertainFamilyNameClass(familyName, gender)) {
      familyNameClass = await this.familyNameClassifier.classify(familyName);
    }

    return this.wordInflector.inflect(familyName, {
      grammaticalCase: grammaticalCase,
      gender: gender,
      wordClass: familyNameClass?.wordClass,
      applicationType: 'familyName',
    });
  }

  /**
   * Determines whether a given family name could be both a noun or adjective word class.
   */
  private isUncertainFamilyNameClass(familyName: string, gender: string): boolean {
    return (
      (gender === GrammaticalGender.FEMININE &&
        UNCERTAIN_FEMININE_FAMILY_NAME_PATTERN.test(familyName)) ||
      (gender === GrammaticalGender.MASCULINE &&
        UNCERTAIN_MASCULINE_FAMILY_NAME_PATTERN.test(familyName))
    );
  }
}
