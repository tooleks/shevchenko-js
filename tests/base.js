var assert = require("assert");
var shevchenko = require("../dist/shevchenko");

describe("shevchenko", function () {

    describe("#shevchenko.getRules()", function () {
        it("should return a new instance of array on every call", function () {
            var rules = shevchenko.getRules();
            assert(rules instanceof Array);
            rules.push({});
            assert(shevchenko.getRules().length === rules.length - 1);
        });
    });

    describe("#shevchenko.getGenders()", function () {
        it("should return valid values", function () {
            var genders = shevchenko.getGenders();
            var validGenders = ["male", "female"];
            assert.equal(genders.join(","), validGenders.join(","));
        });
    });

    describe("#shevchenko.getCaseNames()", function () {
        it("should return valid values", function () {
            var caseNames = shevchenko.getCaseNames();
            var validCaseNames = [
                "nominative",
                "genitive",
                "dative",
                "accusative",
                "ablative",
                "locative",
                "vocative"
            ];
            assert.equal(caseNames.join(","), validCaseNames.join(","));
        });
    });

    describe("#shevchenko()", function () {
        it("should throw an error", function () {
            assert.throws(function () {
                shevchenko();
            }, Error);
        });

        it("should throw an error", function () {
            assert.throws(function () {
                shevchenko({});
            }, Error);
        });

        it("should throw an error", function () {
            assert.throws(function () {
                shevchenko({
                    gender: "bmale"
                }, shevchenko.caseNameGenitive);
            }, Error);
        });

        it("should throw an error", function () {
            assert.throws(function () {
                shevchenko({
                    gender: "male"
                }, shevchenko.caseNameGenitive);
            }, Error);
        });

        it("should return a valid result type", function () {
            var result = shevchenko({
                gender: "male",
                lastName: undefined,
                firstName: undefined,
                middleName: undefined
            }, shevchenko.caseNameGenitive);
            assert(typeof result.lastName === "undefined");
            assert(typeof result.firstName === "undefined");
            assert(typeof result.middleName === "undefined");
        });

        it("should return a valid result type", function () {
            var result = shevchenko({
                gender: "male",
                lastName: "Шевченко",
                firstName: undefined,
                middleName: undefined
            }, shevchenko.caseNameGenitive);
            assert(typeof result.lastName === "string");
            assert(typeof result.firstName === "undefined");
            assert(typeof result.middleName === "undefined");
        });

        it("should return a valid result type", function () {
            var result = shevchenko({
                gender: "male",
                lastName: "Шевченко",
                firstName: "Тарас",
                middleName: undefined
            }, shevchenko.caseNameGenitive);
            assert(typeof result.lastName === "string");
            assert(typeof result.firstName === "string");
            assert(typeof result.middleName === "undefined");
        });

        it("should return a valid result type", function () {
            var result = shevchenko({
                gender: "male",
                lastName: "Шевченко",
                firstName: "Тарас",
                middleName: "Григорович"
            }, shevchenko.caseNameGenitive);
            assert(typeof result.lastName === "string");
            assert(typeof result.firstName === "string");
            assert(typeof result.middleName === "string");
        });
    });

});
