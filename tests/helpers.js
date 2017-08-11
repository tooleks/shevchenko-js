const assert = require("assert");
const shevchenko = require("../dist/shevchenko");

function testInflection(person, caseName, validResult) {
    describe("#shevchenko()", () => {
        it("should inflect correctly \"" + person.lastName + " " + person.firstName + " " + person.middleName + "\" in " + caseName + " case\"", () => {
            const methodName = "in" + caseName.charAt(0).toUpperCase() + caseName.slice(1);
            const result = shevchenko[methodName](person);
            assert.equal(result.lastName.toLowerCase(), validResult.lastName);
            assert.equal(result.firstName.toLowerCase(), validResult.firstName);
            assert.equal(result.middleName.toLowerCase(), validResult.middleName);
        });
    });
}

function testInflections(person, validResults) {
    for (const caseName in validResults) {
        if (validResults.hasOwnProperty(caseName)) {
            testInflection(person, caseName, validResults[caseName]);
        }
    }
}

module.exports = {
    testInflection: testInflection,
    testInflections: testInflections
};
