import RecognizerRule from './RecognizerRule';
import Gender from '../Core/Gender';
import PartOfSpeech from '../Core/PartOfSpeech';
export default class PartOfSpeechRecognizer {
    private readonly rules;
    constructor(rules: RecognizerRule[]);
    /**
     * Recognizes the part of speech of a given word.
     * Returns part of speech of a given word.
     * Returns null if part of speech was not recognized.
     */
    recognize(word: string, gender: Gender): PartOfSpeech | null;
}
