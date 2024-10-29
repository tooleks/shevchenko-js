import { DeclensionRule } from './declension-types';
import { RuleBasedWordInflector } from './rule-based-word-inflector';
import untypedDeclensionRules from './rules/artifacts/declension-rules.json';

const declensionRules = untypedDeclensionRules as DeclensionRule[];

export const wordInflector = new RuleBasedWordInflector(declensionRules);
