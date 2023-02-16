import * as tf from '@tensorflow/tfjs';
import { WordClass } from '../language';
import incorrectPredictionsCache from './cache/incorrect-predictions.json';
import { MODEL_INPUT_SIZE } from './model.config';
import { WordClassTransformer } from './word-class.transformer';
import { WordTransformer } from './word.transformer';

// Disable Node.js environment warning message.
// See https://github.com/tensorflow/tfjs/issues/5349
tf.env().set('IS_NODE', false);

type IncorrectPredictionWord = keyof typeof incorrectPredictionsCache;

export class WordClassRecognizer {
  private readonly modelLoader: tf.io.IOHandler;
  private modelPromise: Promise<tf.LayersModel> | null;
  private readonly wordTransformer: WordTransformer;
  private readonly wordClassTransformer: WordClassTransformer;

  constructor(modelLoader: tf.io.IOHandler) {
    this.modelLoader = modelLoader;
    this.modelPromise = null;
    this.wordTransformer = new WordTransformer(MODEL_INPUT_SIZE);
    this.wordClassTransformer = new WordClassTransformer();
  }

  /**
   * Predicts a word class of the given word.
   */
  async recognize(word: string): Promise<WordClass> {
    const cachedWordClass =
      incorrectPredictionsCache[word.toLowerCase() as IncorrectPredictionWord];
    if (cachedWordClass) {
      return cachedWordClass as WordClass;
    }

    const model = await this.loadModel();
    const input = this.wordTransformer.encode(word);
    const output = await (model.predict(tf.tensor2d([input])) as tf.Tensor).data();
    const wordClass = this.wordClassTransformer.decode(output);

    return wordClass;
  }

  /**
   * Loads the model from the storage. If called multiple times, resolves the same model instance.
   */
  private async loadModel(): Promise<tf.LayersModel> {
    if (this.modelPromise == null) {
      this.modelPromise = tf.loadLayersModel(this.modelLoader);
    }
    return this.modelPromise;
  }
}
