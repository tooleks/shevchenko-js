export class WordTransformer {
  /**
   * Transform the given word for use in part of speech recognition process.
   */
  transform(word: string): string {
    return word.toLowerCase();
  }
}
