import { Gender, GrammaticalCase } from '../core';
import { WordClass } from '../language';

export type InflectorRule = {
  description: string;
  examples: string[];
  partOfSpeech: WordClass;
  gender: Gender[];
  priority: number;
  usage: string[];
  pattern: InflectorPattern;
  grammaticalCases: GrammaticalCases;
};

export type InflectorPattern = {
  find: string;
  modify: string;
};

export type GrammaticalCases = {
  [GrammaticalCase.Nominative]: InflectorCommandGroup[];
  [GrammaticalCase.Genitive]: InflectorCommandGroup[];
  [GrammaticalCase.Dative]: InflectorCommandGroup[];
  [GrammaticalCase.Accusative]: InflectorCommandGroup[];
  [GrammaticalCase.Ablative]: InflectorCommandGroup[];
  [GrammaticalCase.Locative]: InflectorCommandGroup[];
  [GrammaticalCase.Vocative]: InflectorCommandGroup[];
};

export type InflectorCommandGroup = {
  [groupIndex: string]: InflectorCommand;
};

export type InflectorCommand = {
  type: InflectorCommandType;
  value: string;
};

export enum InflectorCommandType {
  Replace = 'replace',
  Append = 'append',
}
