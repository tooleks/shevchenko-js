import { DeclensionRule } from './declension-types';
import untypedDeclensionRules from './rules/artifacts/declension-rules.json';
import { WordInflector } from './word-inflector';

const declensionRules = untypedDeclensionRules as DeclensionRule[];

export const wordInflector = new WordInflector(declensionRules);
