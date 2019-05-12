import { expect } from "chai";
import faker from "faker";

export default function(shevchenko) {
  describe("shevchenko", function() {
    it("should throw an error if no parameters supplied", function() {
      expect(() => shevchenko()).to.throw(TypeError);
    });

    it("should throw an error if an empty object supplied", function() {
      expect(() => shevchenko({})).to.throw(TypeError);
    });

    it("should throw an error if an empty inflection case supplied", function() {
      expect(() => {
        shevchenko({
          gender: faker.random().word(),
        });
      }).to.throw(TypeError);
    });

    it("should throw an error if an invalid gender supplied", function() {
      expect(() => {
        shevchenko(
          {
            gender: faker.random().word(),
          },
          shevchenko.INFLECTION_CASE.GENITIVE,
        );
      }).to.throw(TypeError);
    });

    it("should throw an error if no first name or middle name or last name supplied", function() {
      expect(() => {
        shevchenko(
          {
            gender: shevchenko.GENDER.MALE,
            lastName: undefined,
            firstName: undefined,
            middleName: undefined,
          },
          shevchenko.INFLECTION_CASE.GENITIVE,
        );
      }).to.throw(TypeError);
    });

    it("should return a valid first name, middle name, last name types", function() {
      const result = shevchenko(
        {
          gender: shevchenko.GENDER.MALE,
          firstName: "Тарас",
          middleName: "Григорович",
          lastName: "Шевченко",
        },
        shevchenko.INFLECTION_CASE.GENITIVE,
      );
      expect(result.firstName).to.be.a("string");
      expect(result.middleName).to.be.a("string");
      expect(result.lastName).to.be.a("string");
    });

    it("should return a valid last name type", function() {
      const result = shevchenko(
        {
          gender: shevchenko.GENDER.MALE,
          lastName: "Шевченко",
        },
        shevchenko.INFLECTION_CASE.GENITIVE,
      );
      expect(result.lastName).to.be.a("string");
    });

    it("should return a valid first name type", function() {
      const result = shevchenko(
        {
          gender: shevchenko.GENDER.MALE,
          firstName: "Тарас",
        },
        shevchenko.INFLECTION_CASE.GENITIVE,
      );
      expect(result.firstName).to.be.a("string");
    });

    it("should return a valid middle name type", function() {
      const result = shevchenko(
        {
          gender: shevchenko.GENDER.MALE,
          middleName: "Григорович",
        },
        shevchenko.INFLECTION_CASE.GENITIVE,
      );
      expect(result.middleName).to.be.a("string");
    });
  });
}
