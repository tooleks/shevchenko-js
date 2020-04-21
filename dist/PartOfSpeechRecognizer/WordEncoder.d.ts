export default class WordEncoder {
    private readonly size;
    constructor(size?: number);
    /**
     * Encodes a word for use in the neural network.
     */
    encode(input: string): number[];
}
