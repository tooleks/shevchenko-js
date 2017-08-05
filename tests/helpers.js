var assert = require("assert");
var shevchenko = require("../dist/shevchenko");

function testInflection(person, caseName, validResult) {
    var result = shevchenko(person, caseName);
    describe("#shevchenko()", function () {
        it("should inflect correctly \"" + person.lastName + " " + person.firstName + " " + person.middleName + "\" in " + caseName + " case\"", function () {
            assert.equal(result.lastName, validResult.lastName);
            assert.equal(result.firstName, validResult.firstName);
            assert.equal(result.middleName, validResult.middleName);
        });
    });
}

function testInflections(person, validResults) {
    for (var caseName in validResults) {
        if (validResults.hasOwnProperty(caseName)) {
            testInflection(person, caseName, validResults[caseName]);
        }
    }
}

module.exports = {
    testInflection: testInflection,
    testInflections: testInflections
};
