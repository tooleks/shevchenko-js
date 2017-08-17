const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "male",
    lastName: "кушнір",
    firstName: "мирослав",
    middleName: "назарович"
};

const validResults = {
    nominative: {
        lastName: "кушнір",
        firstName: "мирослав",
        middleName: "назарович"
    },
    genitive: {
        lastName: "кушніра",
        firstName: "мирослава",
        middleName: "назаровича"
    },
    dative: {
        lastName: "кушніру",
        firstName: "мирославу",
        middleName: "назаровичу"
    },
    accusative: {
        lastName: "кушніра",
        firstName: "мирослава",
        middleName: "назаровича"
    },
    ablative: {
        lastName: "кушніром",
        firstName: "мирославом",
        middleName: "назаровичем"
    },
    locative: {
        lastName: "кушнірові",
        firstName: "мирославові",
        middleName: "назаровичу"
    },
    vocative: {
        lastName: "кушніре",
        firstName: "мирославе",
        middleName: "назаровичу"
    }
};

testInflections(person, validResults);
