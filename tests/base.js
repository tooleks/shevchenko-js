const assert = require("assert");
const shevchenko = require("../dist/shevchenko");

describe("shevchenko", function () {

    describe("#shevchenko.getRules()", function () {
        it("should return a new instance of array on every call", function () {
            const rules = shevchenko.getRules();
            assert(rules instanceof Array);
            rules.push({});
            assert(shevchenko.getRules().length === rules.length - 1);
        });
    });

    describe("#shevchenko.getGenders()", function () {
        it("should return valid values", function () {
            const genders = shevchenko.getGenders();
            const validGenders = ["male", "female"];
            assert.equal(genders.join(","), validGenders.join(","));
        });
    });

    describe("#shevchenko.getCaseNames()", function () {
        it("should return valid values", function () {
            const caseNames = shevchenko.getCaseNames();
            const validCaseNames = [
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

        it("should throw an error", function () {
            assert.throws(function () {
                shevchenko({
                    gender: "male",
                    lastName: undefined,
                    firstName: undefined,
                    middleName: undefined
                }, shevchenko.caseNameGenitive)
            }, Error);
        });

        it("should throw an error", function () {
            assert.throws(function () {
                shevchenko({
                    gender: "male",
                    lastName: "Шевченко",
                    firstName: undefined,
                    middleName: undefined
                }, shevchenko.caseNameGenitive)
            }, Error);
        });

        it("should throw an error", function () {
            assert.throws(function () {
                shevchenko({
                    gender: "male",
                    lastName: "Шевченко",
                    firstName: "Тарас",
                    middleName: undefined
                }, shevchenko.caseNameGenitive)
            }, Error);
        });

        it("should return a valid result type", function () {
            const result = shevchenko({
                gender: "male",
                lastName: "Шевченко",
                firstName: "Тарас",
                middleName: "Григорович"
            }, shevchenko.caseNameGenitive);
            assert(typeof result.lastName === "string");
            assert(typeof result.firstName === "string");
            assert(typeof result.middleName === "string");
        });

        it("should return a valid result type", function () {
            const result = shevchenko({
                gender: "male",
                lastName: "Шевченко"
            }, shevchenko.caseNameGenitive);
            assert(typeof result.lastName === "string");
        });

        it("should return a valid result type", function () {
            const result = shevchenko({
                gender: "male",
                firstName: "Тарас"
            }, shevchenko.caseNameGenitive);
            assert(typeof result.firstName === "string");
        });

        it("should return a valid result type", function () {
            const result = shevchenko({
                gender: "male",
                middleName: "Григорович"
            }, shevchenko.caseNameGenitive);
            assert(typeof result.middleName === "string");
        });
    });

});
