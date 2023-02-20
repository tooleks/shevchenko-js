import untypedDeclensionRules from './declension-rules.json';
import { DeclensionRule } from './declension-types';
import { WordInflector } from './word-inflector';

const declensionRules = untypedDeclensionRules as DeclensionRule[];

export const wordInflector = new WordInflector(declensionRules);
