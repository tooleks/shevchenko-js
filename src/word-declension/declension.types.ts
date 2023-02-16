import { Gender, GrammaticalCase, WordClass } from '../language';

export interface DeclensionRule {
  description: string;
  examples: string[];
  partOfSpeech: WordClass;
  gender: Gender[];
  priority: number;
  usage: string[];
  pattern: DeclensionPattern;
  grammaticalCases: GrammaticalCases;
}

export interface DeclensionPattern {
  find: string;
  modify: string;
}

export interface GrammaticalCases {
  [GrammaticalCase.Nominative]: DeclensionCommandGroup[];
  [GrammaticalCase.Genitive]: DeclensionCommandGroup[];
  [GrammaticalCase.Dative]: DeclensionCommandGroup[];
  [GrammaticalCase.Accusative]: DeclensionCommandGroup[];
  [GrammaticalCase.Ablative]: DeclensionCommandGroup[];
  [GrammaticalCase.Locative]: DeclensionCommandGroup[];
  [GrammaticalCase.Vocative]: DeclensionCommandGroup[];
}

export interface DeclensionCommandGroup {
  [groupIndex: string]: DeclensionCommand;
}

export interface DeclensionCommand {
  type: DeclensionCommandType;
  value: string;
}

export enum DeclensionCommandType {
  REPLACE = 'replace',
  APPEND = 'append',
}
