import {expect} from "chai";
import faker from "faker";

export default function(shevchenko) {
    describe("shevchenko(...)", function() {
        it("should throw an error", function() {
            expect(() => shevchenko()).to.throw(TypeError);
        });

        it("should throw an error", function() {
            expect(() => shevchenko({})).to.throw(TypeError);
        });

        it("should throw an error", function() {
            expect(() => {
                shevchenko({
                    gender: faker.random().word(),
                });
            }).to.throw(TypeError);
        });

        it("should throw an error", function() {
            expect(() => {
                shevchenko(
                    {
                        gender: faker.random().word(),
                    },
                    shevchenko.INFLECTION_CASES.GENITIVE,
                );
            }).to.throw(TypeError);
        });

        it("should throw an error", function() {
            expect(() => {
                shevchenko(
                    {
                        gender: shevchenko.GENDERS.MALE,
                        lastName: undefined,
                        firstName: undefined,
                        middleName: undefined,
                    },
                    shevchenko.INFLECTION_CASES.GENITIVE,
                );
            }).to.throw(TypeError);
        });

        it("should throw an error", function() {
            expect(() => {
                shevchenko(
                    {
                        gender: shevchenko.GENDERS.MALE,
                        lastName: "Шевченко",
                        firstName: undefined,
                        middleName: undefined,
                    },
                    shevchenko.INFLECTION_CASES.GENITIVE,
                );
            }).to.throw(TypeError);
        });

        it("should throw an error", function() {
            expect(() => {
                shevchenko(
                    {
                        gender: shevchenko.GENDERS.MALE,
                        lastName: "Шевченко",
                        firstName: "Тарас",
                        middleName: undefined,
                    },
                    shevchenko.INFLECTION_CASES.GENITIVE,
                );
            }).to.throw(TypeError);
        });

        it("should return a valid result type", function() {
            const result = shevchenko(
                {
                    gender: shevchenko.GENDERS.MALE,
                    lastName: "Шевченко",
                    firstName: "Тарас",
                    middleName: "Григорович",
                },
                shevchenko.INFLECTION_CASES.GENITIVE,
            );
            expect(result.lastName).to.be.a("string");
            expect(result.firstName).to.be.a("string");
            expect(result.middleName).to.be.a("string");
        });

        it("should return a valid result type", function() {
            const result = shevchenko(
                {
                    gender: shevchenko.GENDERS.MALE,
                    lastName: "Шевченко",
                },
                shevchenko.INFLECTION_CASES.GENITIVE,
            );
            expect(result.lastName).to.be.a("string");
        });

        it("should return a valid result type", function() {
            const result = shevchenko(
                {
                    gender: shevchenko.GENDERS.MALE,
                    firstName: "Тарас",
                },
                shevchenko.INFLECTION_CASES.GENITIVE,
            );
            expect(result.firstName).to.be.a("string");
        });

        it("should return a valid result type", function() {
            const result = shevchenko(
                {
                    gender: shevchenko.GENDERS.MALE,
                    middleName: "Григорович",
                },
                shevchenko.INFLECTION_CASES.GENITIVE,
            );
            expect(result.middleName).to.be.a("string");
        });
    });
}
