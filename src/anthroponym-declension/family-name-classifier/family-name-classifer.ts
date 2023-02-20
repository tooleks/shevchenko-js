import * as tf from '@tensorflow/tfjs';
import incorrectPredictionsCache from './cache/incorrect-predictions.json';
import { FamilyNameClass } from './family-name-class';
import { FamilyNameClassTransformer } from './family-name-class-transformer';
import { MODEL_INPUT_SIZE } from './model-config';
import { WordTransformer } from './word-transformer';

// Disable Node.js environment warning message in production code.
// See https://github.com/tensorflow/tfjs/issues/5349
tf.env().set('IS_NODE', false);

type IncorrectPredictionWord = keyof typeof incorrectPredictionsCache;

export class FamilyNameClassifier {
  private readonly modelLoader: tf.io.IOHandler;
  private modelPromise: Promise<tf.LayersModel> | null;
  private readonly wordTransformer: WordTransformer;
  private readonly familyNameClassTransformer: FamilyNameClassTransformer;

  constructor(modelLoader: tf.io.IOHandler) {
    this.modelLoader = modelLoader;
    this.modelPromise = null;
    this.wordTransformer = new WordTransformer(MODEL_INPUT_SIZE);
    this.familyNameClassTransformer = new FamilyNameClassTransformer();
  }

  /**
   * Classifies the word class of a given family name.
   */
  async classify(familyName: string): Promise<FamilyNameClass> {
    let familyNameClass = this.getCached(familyName);
    if (familyNameClass != null) {
      return familyNameClass;
    }

    const model = await this.loadModel();
    const input = this.wordTransformer.encode(familyName);
    const output = await (model.predict(tf.tensor2d([input])) as tf.Tensor).data();
    familyNameClass = this.familyNameClassTransformer.decode(output);

    return familyNameClass;
  }

  /**
   * Returns a classified family name class from the cache if exists.
   */
  private getCached(familyName: string): FamilyNameClass | null {
    let familyNameClass: FamilyNameClass | null = null;

    const wordClass =
      incorrectPredictionsCache[familyName.toLowerCase() as IncorrectPredictionWord];
    if (wordClass) {
      familyNameClass = { wordClass } as FamilyNameClass;
    }

    return familyNameClass;
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
