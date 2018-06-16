"use strict";

const {expect} = require("chai");

const providers = [require("../dist/module/shevchenko"), require("../dist/bundle/shevchenko.min")];

providers.forEach((shevchenko) => {
    describe("general tests", function() {
        describe("shevchenko.GENDER_NAMES", function() {
            it("should return a valid gender names", function() {
                expect(shevchenko.GENDER_NAMES).to.be.deep.equal({
                    MALE: "male",
                    FEMALE: "female",
                });
            });
        });

        describe("shevchenko.INFLECTION_CASE_NAMES", function() {
            it("should return a valid case names", function() {
                expect(shevchenko.INFLECTION_CASE_NAMES).to.be.deep.equal({
                    NOMINATIVE: "nominative",
                    GENITIVE: "genitive",
                    DATIVE: "dative",
                    ACCUSATIVE: "accusative",
                    ABLATIVE: "ablative",
                    LOCATIVE: "locative",
                    VOCATIVE: "vocative",
                });
            });
        });

        describe("shevchenko()", function() {
            it("should throw an error", function() {
                expect(() => shevchenko()).to.throw(TypeError);
            });

            it("should throw an error", function() {
                expect(() => shevchenko({})).to.throw(TypeError);
            });

            it("should throw an error", function() {
                expect(() => {
                    shevchenko({
                        gender: "bmale",
                    });
                }).to.throw(TypeError);
            });

            it("should throw an error", function() {
                const gender = "bmale";
                expect(() => {
                    shevchenko(
                        {
                            gender: "bmale",
                        },
                        shevchenko.INFLECTION_CASE_NAMES.GENITIVE,
                    );
                }).to.throw(TypeError);
            });

            it("should throw an error", function() {
                expect(() => {
                    shevchenko(
                        {
                            gender: "male",
                            lastName: undefined,
                            firstName: undefined,
                            middleName: undefined,
                        },
                        shevchenko.INFLECTION_CASE_NAMES.GENITIVE,
                    );
                }).to.throw(TypeError);
            });

            it("should throw an error", function() {
                expect(() => {
                    shevchenko(
                        {
                            gender: "male",
                            lastName: "Шевченко",
                            firstName: undefined,
                            middleName: undefined,
                        },
                        shevchenko.INFLECTION_CASE_NAMES.GENITIVE,
                    );
                }).to.throw(TypeError);
            });

            it("should throw an error", function() {
                expect(() => {
                    shevchenko(
                        {
                            gender: "male",
                            lastName: "Шевченко",
                            firstName: "Тарас",
                            middleName: undefined,
                        },
                        shevchenko.INFLECTION_CASE_NAMES.GENITIVE,
                    );
                }).to.throw(TypeError);
            });

            it("should return a valid result type", function() {
                const result = shevchenko(
                    {
                        gender: "male",
                        lastName: "Шевченко",
                        firstName: "Тарас",
                        middleName: "Григорович",
                    },
                    shevchenko.INFLECTION_CASE_NAMES.GENITIVE,
                );
                expect(result.lastName).to.be.a("string");
                expect(result.firstName).to.be.a("string");
                expect(result.middleName).to.be.a("string");
            });

            it("should return a valid result type", function() {
                const result = shevchenko(
                    {
                        gender: "male",
                        lastName: "Шевченко",
                    },
                    shevchenko.INFLECTION_CASE_NAMES.GENITIVE,
                );
                expect(result.lastName).to.be.a("string");
            });

            it("should return a valid result type", function() {
                const result = shevchenko(
                    {
                        gender: "male",
                        firstName: "Тарас",
                    },
                    shevchenko.INFLECTION_CASE_NAMES.GENITIVE,
                );
                expect(result.firstName).to.be.a("string");
            });

            it("should return a valid result type", function() {
                const result = shevchenko(
                    {
                        gender: "male",
                        middleName: "Григорович",
                    },
                    shevchenko.INFLECTION_CASE_NAMES.GENITIVE,
                );
                expect(result.middleName).to.be.a("string");
            });
        });
    });
});
