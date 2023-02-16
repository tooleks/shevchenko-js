import untypedInflectorRules from './artifacts/inflection-rules.json';
import { InflectorRule } from './inflector.types';

const inflectorRules = untypedInflectorRules as InflectorRule[];

export { inflectorRules as inflectorRules };
export * from './rule-inflector';
export * from './inflector.types';
