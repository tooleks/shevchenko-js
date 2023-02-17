import { GrammaticalCase, GrammaticalGender, WordClass } from '../language';

export interface DeclensionRule {
  description: string;
  examples: string[];
  wordClass: WordClass;
  gender: GrammaticalGender[];
  priority: number;
  application: string[];
  pattern: DeclensionPattern;
  grammaticalCases: GrammaticalCases;
}

export interface DeclensionPattern {
  find: string;
  modify: string;
}

export interface GrammaticalCases {
  [GrammaticalCase.NOMINATIVE]: DeclensionCommandGroup[];
  [GrammaticalCase.GENITIVE]: DeclensionCommandGroup[];
  [GrammaticalCase.DATIVE]: DeclensionCommandGroup[];
  [GrammaticalCase.ACCUSATIVE]: DeclensionCommandGroup[];
  [GrammaticalCase.ABLATIVE]: DeclensionCommandGroup[];
  [GrammaticalCase.LOCATIVE]: DeclensionCommandGroup[];
  [GrammaticalCase.VOCATIVE]: DeclensionCommandGroup[];
}

export interface DeclensionCommandGroup {
  [groupIndex: string]: DeclensionCommand;
}

export interface DeclensionCommand {
  action: DeclensionCommandAction;
  value: string;
}

export enum DeclensionCommandAction {
  REPLACE = 'replace',
  APPEND = 'append',
}
