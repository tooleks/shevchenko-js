"use strict";

const assert = require("assert");
const shevchenko = require("../../dist/module/shevchenko");

function testInflection(person, caseName, validResult) {
    it("should inflect correctly \"" + person.lastName + " " + person.firstName + " " + person.middleName + "\" in " + caseName + " case\" via \"in\" method", function () {
        const methodName = "in" + caseName.charAt(0).toUpperCase() + caseName.slice(1);
        const result = shevchenko[methodName](person);
        assert.equal(result.lastName.toLowerCase(), validResult.lastName);
        assert.equal(result.firstName.toLowerCase(), validResult.firstName);
        assert.equal(result.middleName.toLowerCase(), validResult.middleName);
    });
}

function testInflections(person, validResults) {
    describe("#shevchenko() inflections", function () {
        for (let caseName in validResults) {
            if (validResults.hasOwnProperty(caseName)) {
                testInflection(person, caseName, validResults[caseName]);
            }
        }
    });
}

module.exports = testInflections;
