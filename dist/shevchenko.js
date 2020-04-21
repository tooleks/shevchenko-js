"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GrammaticalCase_1 = __importDefault(require("./Core/GrammaticalCase"));
const bootstrap_1 = require("./bootstrap");
/**
 * Inflects an anthroponym in nominative grammatical case.
 */
function inNominative(anthroponym) {
    return bootstrap_1.anthroponymInflector.inflect(anthroponym, GrammaticalCase_1.default.Nominative);
}
exports.inNominative = inNominative;
/**
 * Inflects an anthroponym in genitive grammatical case.
 */
function inGenitive(anthroponym) {
    return bootstrap_1.anthroponymInflector.inflect(anthroponym, GrammaticalCase_1.default.Genitive);
}
exports.inGenitive = inGenitive;
/**
 * Inflects an anthroponym in dative grammatical case.
 */
function inDative(anthroponym) {
    return bootstrap_1.anthroponymInflector.inflect(anthroponym, GrammaticalCase_1.default.Dative);
}
exports.inDative = inDative;
/**
 * Inflects an anthroponym in accusative grammatical case.
 */
function inAccusative(anthroponym) {
    return bootstrap_1.anthroponymInflector.inflect(anthroponym, GrammaticalCase_1.default.Accusative);
}
exports.inAccusative = inAccusative;
/**
 * Inflects an anthroponym in ablative grammatical case.
 */
function inAblative(anthroponym) {
    return bootstrap_1.anthroponymInflector.inflect(anthroponym, GrammaticalCase_1.default.Ablative);
}
exports.inAblative = inAblative;
/**
 * Inflects an anthroponym in locative grammatical case.
 */
function inLocative(anthroponym) {
    return bootstrap_1.anthroponymInflector.inflect(anthroponym, GrammaticalCase_1.default.Locative);
}
exports.inLocative = inLocative;
/**
 * Inflects an anthroponym in vocative grammatical case.
 */
function inVocative(anthroponym) {
    return bootstrap_1.anthroponymInflector.inflect(anthroponym, GrammaticalCase_1.default.Vocative);
}
exports.inVocative = inVocative;
//# sourceMappingURL=shevchenko.js.map