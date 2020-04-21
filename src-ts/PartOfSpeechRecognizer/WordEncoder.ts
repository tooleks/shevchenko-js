import NeuralNetworkParameters from './NeuralNetworkParameters';

export default class WordEncoder {
  private readonly size: number;

  constructor(size: number = NeuralNetworkParameters.InputLayerSize) {
    this.size = size;
  }

  /**
   * Encodes a word for use in the neural network.
   */
  encode(input: string): number[] {
    return input
      .toLowerCase()
      .split('')
      .map(char => char.charCodeAt(0).toString(2))
      .join('')
      .padStart(this.size, '0')
      .split('')
      .map(digit => Number.parseInt(digit, 2));
  }
}
