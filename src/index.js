"use strict";

const Inflector = require("./Inflector");

const inflector = new Inflector(JSON.parse(process.env.RULES));

const shevchenko = (person, caseName) => inflector.inflect(person, caseName);

shevchenko.inNominative = (person) => inflector.inflect(person, Inflector.CASE_NAMES.NOMINATIVE);
shevchenko.inGenitive = (person) => inflector.inflect(person, Inflector.CASE_NAMES.GENITIVE);
shevchenko.inDative = (person) => inflector.inflect(person, Inflector.CASE_NAMES.DATIVE);
shevchenko.inAccusative = (person) => inflector.inflect(person, Inflector.CASE_NAMES.ACCUSATIVE);
shevchenko.inAblative = (person) => inflector.inflect(person, Inflector.CASE_NAMES.ABLATIVE);
shevchenko.inLocative = (person) => inflector.inflect(person, Inflector.CASE_NAMES.LOCATIVE);
shevchenko.inVocative = (person) => inflector.inflect(person, Inflector.CASE_NAMES.VOCATIVE);
shevchenko.inAll = (person) => {
    return Object.values(Inflector.CASE_NAMES).reduce((results, caseName) => {
        results[caseName] = shevchenko(person, caseName);
        return results;
    }, {});
};

shevchenko.GENDER_NAMES = Object.freeze(Inflector.GENDER_NAMES);
shevchenko.CASE_NAMES = Object.freeze(Inflector.CASE_NAMES);

module.exports = shevchenko;
