import { GrammaticalGender } from '../language';

export type GrammaticalGenderPatterns = {
  masculinePattern: RegExp;
  femininePattern: RegExp;
};

export class GrammaticalGenderDetector {
  private readonly masculinePattern: RegExp;
  private readonly femininePattern: RegExp;

  constructor(params: GrammaticalGenderPatterns) {
    this.masculinePattern = params.masculinePattern;
    this.femininePattern = params.femininePattern;
  }

  detect(word: string): GrammaticalGender | null {
    const masculineResult = word.match(this.masculinePattern);
    const feminineResult = word.match(this.femininePattern);

    if (masculineResult != null && feminineResult == null) {
      return GrammaticalGender.MASCULINE;
    } else if (masculineResult == null && feminineResult != null) {
      return GrammaticalGender.FEMININE;
    } else if (masculineResult != null && feminineResult != null) {
      const [masculineMatch] = masculineResult;
      const [feminineMatch] = feminineResult;
      return masculineMatch.length > feminineMatch.length
        ? GrammaticalGender.MASCULINE
        : GrammaticalGender.FEMININE;
    }

    return null;
  }
}
