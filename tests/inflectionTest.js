"use strict";

const {buildPerson, testInflections} = require("./utils");
const inflections = require("./src/inflections");

inflections.forEach((inflection) => {
    const person = buildPerson(
        inflection.gender,
        inflection.cases.nominative.lastName,
        inflection.cases.nominative.firstName,
        inflection.cases.nominative.middleName,
    );
    testInflections(person, inflection.cases);
});
