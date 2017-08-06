var assert = require("assert");
var testInflections = require("../helpers").testInflections;

var person = {
    gender: "female",
    lastName: "перекотиполе",
    firstName: "аліса",
    middleName: "адольфівна"
};

var validResults = {
    nominative: {
        lastName: "перекотиполе",
        firstName: "аліса",
        middleName: "адольфівна"
    },
    genitive: {
        lastName: "перекотиполя",
        firstName: "аліси",
        middleName: "адольфівни"
    },
    dative: {
        lastName: "перекотиполю",
        firstName: "алісі",
        middleName: "адольфівні"
    },
    accusative: {
        lastName: "перекотиполе",
        firstName: "алісу",
        middleName: "адольфівну"
    },
    ablative: {
        lastName: "перекотиполем",
        firstName: "алісою",
        middleName: "адольфівною"
    },
    locative: {
        lastName: "перекотиполі",
        firstName: "алісі",
        middleName: "адольфівні"
    },
    vocative: {
        lastName: "перекотиполе",
        firstName: "алісо",
        middleName: "адольфівно"
    }
};

testInflections(person, validResults);
