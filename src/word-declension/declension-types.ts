import { GrammaticalCase, GrammaticalGender, WordClass } from '../language';

export interface DeclensionRule {
  description: string;
  examples: string[];
  wordClass: WordClass;
  gender: GrammaticalGender[];
  priority: number;
  applicationType: string[];
  pattern: DeclensionPattern;
  grammaticalCases: GrammaticalCases;
}

export interface DeclensionPattern {
  find: string;
  modify: string;
}

export interface GrammaticalCases {
  [GrammaticalCase.NOMINATIVE]: InflectionCommands[];
  [GrammaticalCase.GENITIVE]: InflectionCommands[];
  [GrammaticalCase.DATIVE]: InflectionCommands[];
  [GrammaticalCase.ACCUSATIVE]: InflectionCommands[];
  [GrammaticalCase.ABLATIVE]: InflectionCommands[];
  [GrammaticalCase.LOCATIVE]: InflectionCommands[];
  [GrammaticalCase.VOCATIVE]: InflectionCommands[];
}

export interface InflectionCommands {
  [groupIndex: string]: InflectionCommand;
}

export interface InflectionCommand {
  action: InflectionCommandAction;
  value: string;
}

export enum InflectionCommandAction {
  REPLACE = 'replace',
  APPEND = 'append',
}
