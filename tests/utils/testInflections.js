"use strict";

const {expect} = require("chai");

const providers = [require("../../dist/module/shevchenko"), require("../../dist/bundle/shevchenko.min")];

const testInflection = (person, inflectionCaseName, validResult) => {
    const fullName = `${person.lastName} ${person.firstName} ${person.middleName}`;

    providers.forEach((shevchenko) => {
        it(`should inflect correctly "${fullName}" in "${inflectionCaseName}" case via "root" method`, function() {
            const result = shevchenko(person, inflectionCaseName);
            expect(validResult.lastName).to.be.deep.equal(result.lastName.toLowerCase());
            expect(validResult.firstName).to.be.deep.equal(result.firstName.toLowerCase());
            expect(validResult.middleName).to.be.deep.equal(result.middleName.toLowerCase());
        });

        it(`should inflect correctly "${fullName}" in "${inflectionCaseName}" case via "in" method`, function() {
            const methodName = "in" + inflectionCaseName.charAt(0).toUpperCase() + inflectionCaseName.slice(1);
            const result = shevchenko[methodName](person);
            expect(validResult.lastName).to.be.deep.equal(result.lastName.toLowerCase());
            expect(validResult.firstName).to.be.deep.equal(result.firstName.toLowerCase());
            expect(validResult.middleName).to.be.deep.equal(result.middleName.toLowerCase());
        });
    });
};

const testInflections = (person, validResults) => {
    describe("inflection tests", function() {
        for (let inflectionCaseName in validResults) {
            if (validResults.hasOwnProperty(inflectionCaseName)) {
                testInflection(person, inflectionCaseName, validResults[inflectionCaseName]);
            }
        }
    });
};

module.exports = testInflections;
