/* global describe */

'use strict';

const { expect } = require('chai');

module.exports = (shevchenko) => {
  describe('shevchenko', () => {
    it('should throw an error for empty arguments list', () => {
      expect(() => shevchenko.inNominative()).to.throw(TypeError, '"anthroponym" must be an object.');
      expect(() => shevchenko.inGenitive()).to.throw(TypeError, '"anthroponym" must be an object.');
      expect(() => shevchenko.inDative()).to.throw(TypeError, '"anthroponym" must be an object.');
      expect(() => shevchenko.inAccusative()).to.throw(TypeError, '"anthroponym" must be an object.');
      expect(() => shevchenko.inAblative()).to.throw(TypeError, '"anthroponym" must be an object.');
      expect(() => shevchenko.inLocative()).to.throw(TypeError, '"anthroponym" must be an object.');
      expect(() => shevchenko.inVocative()).to.throw(TypeError, '"anthroponym" must be an object.');
    });

    it('should throw an error if unsupported gender provided', () => {
      const anthroponym = { gender: 'nonbinary', firstName: 'Тарас', middleName: 'Григорович', lastName: 'Шевченко' };
      expect(() => shevchenko.inNominative(anthroponym)).to.throw(TypeError, '"anthroponym.gender" must be one of the following: "male", "female".');
      expect(() => shevchenko.inGenitive(anthroponym)).to.throw(TypeError, '"anthroponym.gender" must be one of the following: "male", "female".');
      expect(() => shevchenko.inDative(anthroponym)).to.throw(TypeError, '"anthroponym.gender" must be one of the following: "male", "female".');
      expect(() => shevchenko.inAccusative(anthroponym)).to.throw(TypeError, '"anthroponym.gender" must be one of the following: "male", "female".');
      expect(() => shevchenko.inAblative(anthroponym)).to.throw(TypeError, '"anthroponym.gender" must be one of the following: "male", "female".');
      expect(() => shevchenko.inLocative(anthroponym)).to.throw(TypeError, '"anthroponym.gender" must be one of the following: "male", "female".');
      expect(() => shevchenko.inVocative(anthroponym)).to.throw(TypeError, '"anthroponym.gender" must be one of the following: "male", "female".');
    });

    it('should throw an error if none of the name fields provided', () => {
      const anthroponym = { gender: 'male' };
      expect(() => shevchenko.inNominative(anthroponym)).to.throw(TypeError, 'At least one of the following fields must present: "anthroponym.firstName", "anthroponym.middleName", "anthroponym.lastName".');
      expect(() => shevchenko.inGenitive(anthroponym)).to.throw(TypeError, 'At least one of the following fields must present: "anthroponym.firstName", "anthroponym.middleName", "anthroponym.lastName".');
      expect(() => shevchenko.inDative(anthroponym)).to.throw(TypeError, 'At least one of the following fields must present: "anthroponym.firstName", "anthroponym.middleName", "anthroponym.lastName".');
      expect(() => shevchenko.inAccusative(anthroponym)).to.throw(TypeError, 'At least one of the following fields must present: "anthroponym.firstName", "anthroponym.middleName", "anthroponym.lastName".');
      expect(() => shevchenko.inAblative(anthroponym)).to.throw(TypeError, 'At least one of the following fields must present: "anthroponym.firstName", "anthroponym.middleName", "anthroponym.lastName".');
      expect(() => shevchenko.inLocative(anthroponym)).to.throw(TypeError, 'At least one of the following fields must present: "anthroponym.firstName", "anthroponym.middleName", "anthroponym.lastName".');
      expect(() => shevchenko.inVocative(anthroponym)).to.throw(TypeError, 'At least one of the following fields must present: "anthroponym.firstName", "anthroponym.middleName", "anthroponym.lastName".');
    });

    it('should throw an error if provided first name is not a string', () => {
      const anthroponym = { gender: 'male', firstName: null, middleName: 'Григорович', lastName: 'Шевченко' };
      expect(() => shevchenko.inNominative(anthroponym)).to.throw(TypeError, '"anthroponym.firstName" must be a string.');
      expect(() => shevchenko.inGenitive(anthroponym)).to.throw(TypeError, '"anthroponym.firstName" must be a string.');
      expect(() => shevchenko.inDative(anthroponym)).to.throw(TypeError, '"anthroponym.firstName" must be a string.');
      expect(() => shevchenko.inAccusative(anthroponym)).to.throw(TypeError, '"anthroponym.firstName" must be a string.');
      expect(() => shevchenko.inAblative(anthroponym)).to.throw(TypeError, '"anthroponym.firstName" must be a string.');
      expect(() => shevchenko.inLocative(anthroponym)).to.throw(TypeError, '"anthroponym.firstName" must be a string.');
      expect(() => shevchenko.inVocative(anthroponym)).to.throw(TypeError, '"anthroponym.firstName" must be a string.');
    });

    it('should throw an error if provided middle name is not a string', () => {
      const anthroponym = { gender: 'male', firstName: 'Тарас', middleName: null, lastName: 'Шевченко' };
      expect(() => shevchenko.inNominative(anthroponym)).to.throw(TypeError, '"anthroponym.middleName" must be a string.');
      expect(() => shevchenko.inGenitive(anthroponym)).to.throw(TypeError, '"anthroponym.middleName" must be a string.');
      expect(() => shevchenko.inDative(anthroponym)).to.throw(TypeError, '"anthroponym.middleName" must be a string.');
      expect(() => shevchenko.inAccusative(anthroponym)).to.throw(TypeError, '"anthroponym.middleName" must be a string.');
      expect(() => shevchenko.inAblative(anthroponym)).to.throw(TypeError, '"anthroponym.middleName" must be a string.');
      expect(() => shevchenko.inLocative(anthroponym)).to.throw(TypeError, '"anthroponym.middleName" must be a string.');
      expect(() => shevchenko.inVocative(anthroponym)).to.throw(TypeError, '"anthroponym.middleName" must be a string.');
    });

    it('should throw an error if provided last name is not a string', () => {
      const anthroponym = { gender: 'male', firstName: 'Тарас', middleName: 'Григорович', lastName: null };
      expect(() => shevchenko.inNominative(anthroponym)).to.throw(TypeError, '"anthroponym.lastName" must be a string.');
      expect(() => shevchenko.inGenitive(anthroponym)).to.throw(TypeError, '"anthroponym.lastName" must be a string.');
      expect(() => shevchenko.inDative(anthroponym)).to.throw(TypeError, '"anthroponym.lastName" must be a string.');
      expect(() => shevchenko.inAccusative(anthroponym)).to.throw(TypeError, '"anthroponym.lastName" must be a string.');
      expect(() => shevchenko.inAblative(anthroponym)).to.throw(TypeError, '"anthroponym.lastName" must be a string.');
      expect(() => shevchenko.inLocative(anthroponym)).to.throw(TypeError, '"anthroponym.lastName" must be a string.');
      expect(() => shevchenko.inVocative(anthroponym)).to.throw(TypeError, '"anthroponym.lastName" must be a string.');
    });

    it('should not throw an error if first name provided', () => {
      const anthroponym = { gender: 'male', firstName: 'Тарас' };
      expect(() => shevchenko.inNominative(anthroponym)).to.not.throw(TypeError);
      expect(() => shevchenko.inGenitive(anthroponym)).to.not.throw(TypeError);
      expect(() => shevchenko.inDative(anthroponym)).to.not.throw(TypeError);
      expect(() => shevchenko.inAccusative(anthroponym)).to.not.throw(TypeError);
      expect(() => shevchenko.inAblative(anthroponym)).to.not.throw(TypeError);
      expect(() => shevchenko.inLocative(anthroponym)).to.not.throw(TypeError);
      expect(() => shevchenko.inVocative(anthroponym)).to.not.throw(TypeError);
    });

    it('should not throw an error if middle name provided', () => {
      const anthroponym = { gender: 'male', middleName: 'Григорович' };
      expect(() => shevchenko.inNominative(anthroponym)).to.not.throw(TypeError);
      expect(() => shevchenko.inGenitive(anthroponym)).to.not.throw(TypeError);
      expect(() => shevchenko.inDative(anthroponym)).to.not.throw(TypeError);
      expect(() => shevchenko.inAccusative(anthroponym)).to.not.throw(TypeError);
      expect(() => shevchenko.inAblative(anthroponym)).to.not.throw(TypeError);
      expect(() => shevchenko.inLocative(anthroponym)).to.not.throw(TypeError);
      expect(() => shevchenko.inVocative(anthroponym)).to.not.throw(TypeError);
    });

    it('should not throw an error if last name provided', () => {
      const anthroponym = { gender: 'male', lastName: 'Шевченко' };
      expect(() => shevchenko.inNominative(anthroponym)).to.not.throw(TypeError);
      expect(() => shevchenko.inGenitive(anthroponym)).to.not.throw(TypeError);
      expect(() => shevchenko.inDative(anthroponym)).to.not.throw(TypeError);
      expect(() => shevchenko.inAccusative(anthroponym)).to.not.throw(TypeError);
      expect(() => shevchenko.inAblative(anthroponym)).to.not.throw(TypeError);
      expect(() => shevchenko.inLocative(anthroponym)).to.not.throw(TypeError);
      expect(() => shevchenko.inVocative(anthroponym)).to.not.throw(TypeError);
    });

    it('should not throw an error if агдд name provided', () => {
      const anthroponym = { gender: 'male', firstName: 'Тарас', middleName: 'Григорович', lastName: 'Шевченко' };
      expect(() => shevchenko.inNominative(anthroponym)).to.not.throw(TypeError);
      expect(() => shevchenko.inGenitive(anthroponym)).to.not.throw(TypeError);
      expect(() => shevchenko.inDative(anthroponym)).to.not.throw(TypeError);
      expect(() => shevchenko.inAccusative(anthroponym)).to.not.throw(TypeError);
      expect(() => shevchenko.inAblative(anthroponym)).to.not.throw(TypeError);
      expect(() => shevchenko.inLocative(anthroponym)).to.not.throw(TypeError);
      expect(() => shevchenko.inVocative(anthroponym)).to.not.throw(TypeError);
    });
  });
}
