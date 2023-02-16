import untypedDeclensionRules from './artifacts/declension-rules.json';
import { DeclensionRule } from './declension.types';

const declensionRules = untypedDeclensionRules as DeclensionRule[];

export { declensionRules };
export * from './declension-rule-inflector';
export * from './declension.types';
