import { DeclensionRule } from './declension-types';
import declensionRules from './rules/artifacts/declension-rules.json';
import { WordInflector } from './word-inflector';

export const wordInflector = new WordInflector(declensionRules as DeclensionRule[]);
