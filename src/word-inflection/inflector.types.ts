import { Gender, GrammaticalCase } from '../core';
import { WordClass } from '../language';

export interface InflectorRule {
  description: string;
  examples: string[];
  partOfSpeech: WordClass;
  gender: Gender[];
  priority: number;
  usage: string[];
  pattern: InflectorPattern;
  grammaticalCases: GrammaticalCases;
}

export interface InflectorPattern {
  find: string;
  modify: string;
}

export interface GrammaticalCases {
  [GrammaticalCase.Nominative]: InflectorCommandGroup[];
  [GrammaticalCase.Genitive]: InflectorCommandGroup[];
  [GrammaticalCase.Dative]: InflectorCommandGroup[];
  [GrammaticalCase.Accusative]: InflectorCommandGroup[];
  [GrammaticalCase.Ablative]: InflectorCommandGroup[];
  [GrammaticalCase.Locative]: InflectorCommandGroup[];
  [GrammaticalCase.Vocative]: InflectorCommandGroup[];
}

export interface InflectorCommandGroup {
  [groupIndex: string]: InflectorCommand;
}

export interface InflectorCommand {
  type: InflectorCommandType;
  value: string;
}

export enum InflectorCommandType {
  Replace = 'replace',
  Append = 'append',
}
