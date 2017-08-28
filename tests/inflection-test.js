"use strict";

const buildPerson = require("./util/build-person");
const testInflections = require("./util/test-inflections");
const inflections = require("./src/inflections");

inflections.forEach((inflection) => {
    const person = buildPerson(
        inflection.gender,
        inflection.cases.nominative.lastName,
        inflection.cases.nominative.firstName,
        inflection.cases.nominative.middleName
    );
    testInflections(person, inflection.cases);
});
