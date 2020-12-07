import { PartOfSpeech } from './part-of-speech.enum';

export type NeuralNetworkTrainingData = {
  [word: string]: PartOfSpeech;
};
