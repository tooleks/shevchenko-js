"use strict";

const assert = require("assert");
const shevchenko = require("../dist/module/shevchenko");

describe("#shevchenko() general", function () {
    describe("shevchenko.getRules()", function () {
        it("should return a new instance of array on every call", function () {
            const rules = shevchenko.getRules();
            assert(rules instanceof Array);
            rules.push({});
            assert(shevchenko.getRules().length === rules.length - 1);
        });
    });

    describe("shevchenko.getGenderNames()", function () {
        it("should return a new instance of array on every call", function () {
            const genderNames = shevchenko.getGenderNames();
            genderNames.push({});
            assert(shevchenko.getGenderNames().length === genderNames.length - 1);
        });

        it("should return valid values", function () {
            const genderNames = shevchenko.getGenderNames();
            const validGenders = ["male", "female"];
            assert.equal(genderNames.join(","), validGenders.join(","));
        });
    });

    describe("shevchenko.getCaseNames()", function () {
        it("should return a new instance of array on every call", function () {
            const caseNames = shevchenko.getCaseNames();
            caseNames.push({});
            assert(shevchenko.getCaseNames().length === caseNames.length - 1);
        });

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

    describe("shevchenko()", function () {
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
                }, shevchenko.getCaseNameGenitive());
            }, Error);
        });

        it("should throw an error", function () {
            assert.throws(function () {
                shevchenko({
                    gender: "male"
                }, shevchenko.getCaseNameGenitive());
            }, Error);
        });

        it("should throw an error", function () {
            assert.throws(function () {
                shevchenko({
                    gender: "male",
                    lastName: undefined,
                    firstName: undefined,
                    middleName: undefined
                }, shevchenko.getCaseNameGenitive())
            }, Error);
        });

        it("should throw an error", function () {
            assert.throws(function () {
                shevchenko({
                    gender: "male",
                    lastName: "Шевченко",
                    firstName: undefined,
                    middleName: undefined
                }, shevchenko.getCaseNameGenitive())
            }, Error);
        });

        it("should throw an error", function () {
            assert.throws(function () {
                shevchenko({
                    gender: "male",
                    lastName: "Шевченко",
                    firstName: "Тарас",
                    middleName: undefined
                }, shevchenko.getCaseNameGenitive())
            }, Error);
        });

        it("should return a valid result type", function () {
            const result = shevchenko({
                gender: "male",
                lastName: "Шевченко",
                firstName: "Тарас",
                middleName: "Григорович"
            }, shevchenko.getCaseNameGenitive());
            assert(typeof result.lastName === "string");
            assert(typeof result.firstName === "string");
            assert(typeof result.middleName === "string");
        });

        it("should return a valid result type", function () {
            const result = shevchenko({
                gender: "male",
                lastName: "Шевченко"
            }, shevchenko.getCaseNameGenitive());
            assert(typeof result.lastName === "string");
        });

        it("should return a valid result type", function () {
            const result = shevchenko({
                gender: "male",
                firstName: "Тарас"
            }, shevchenko.getCaseNameGenitive());
            assert(typeof result.firstName === "string");
        });

        it("should return a valid result type", function () {
            const result = shevchenko({
                gender: "male",
                middleName: "Григорович"
            }, shevchenko.getCaseNameGenitive());
            assert(typeof result.middleName === "string");
        });
    });
});
