import untypedDeclensionRules from './declension-rules.json';
import { DeclensionRule } from './declension-types';

const declensionRules = untypedDeclensionRules as DeclensionRule[];

export { declensionRules };
export * from './declension-rule-inflector';
export * from './declension-types';
export * from './declension-rule-matchers';
