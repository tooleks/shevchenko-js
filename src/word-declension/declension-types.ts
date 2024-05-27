import { GrammaticalCase, GrammaticalGender, WordClass } from '../language';

export type DeclensionRule = {
  description: string;
  examples: string[];
  wordClass: WordClass;
  gender: GrammaticalGender[];
  priority: number;
  applicationType: ApplicationType[];
  pattern: DeclensionPattern;
  grammaticalCases: GrammaticalCases;
};

export type ApplicationType = 'givenName' | 'patronymicName' | 'familyName';

export type DeclensionPattern = {
  find: string;
  modify: string;
};

export type GrammaticalCases = {
  [GrammaticalCase.NOMINATIVE]: InflectionCommands[];
  [GrammaticalCase.GENITIVE]: InflectionCommands[];
  [GrammaticalCase.DATIVE]: InflectionCommands[];
  [GrammaticalCase.ACCUSATIVE]: InflectionCommands[];
  [GrammaticalCase.ABLATIVE]: InflectionCommands[];
  [GrammaticalCase.LOCATIVE]: InflectionCommands[];
  [GrammaticalCase.VOCATIVE]: InflectionCommands[];
};

export type InflectionCommands = {
  [groupIndex: string]: InflectionCommand;
};

export type InflectionCommand = {
  action: InflectionCommandAction;
  value: string;
};

export enum InflectionCommandAction {
  REPLACE = 'replace',
  APPEND = 'append',
}
