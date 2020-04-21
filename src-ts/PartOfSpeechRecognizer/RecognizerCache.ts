import PartOfSpeech from '../Core/PartOfSpeech';

type RecognizerCache = {
  [word: string]: PartOfSpeech;
};

export default RecognizerCache;
