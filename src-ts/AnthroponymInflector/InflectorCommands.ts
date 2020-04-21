import InflectorCommand from './InflectorCommand';
import PartOfSpeech from '../Core/PartOfSpeech';

type InflectorCommands = {
  [pos in PartOfSpeech]: InflectorCommand;
};

export default InflectorCommands;
