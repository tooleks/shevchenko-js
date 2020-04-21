import InflectorCommand from './InflectorCommand';
import PartOfSpeech from '../Core/PartOfSpeech';
declare type InflectorCommands = {
    [pos in PartOfSpeech]: InflectorCommand;
};
export default InflectorCommands;
