var assert = require("assert");
var shevchenko = require("../dist/shevchenko");

function testInflection(person, caseName, validResult) {
    var methodName = "in" + caseName.charAt(0).toUpperCase() + caseName.slice(1);
    var result = shevchenko[methodName](person);
    describe("#shevchenko()", function () {
        it("should inflect correctly \"" + person.lastName + " " + person.firstName + " " + person.middleName + "\" in " + caseName + " case\"", function () {
            assert.equal(result.lastName.toLowerCase(), validResult.lastName);
            assert.equal(result.firstName.toLowerCase(), validResult.firstName);
            assert.equal(result.middleName.toLowerCase(), validResult.middleName);
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
