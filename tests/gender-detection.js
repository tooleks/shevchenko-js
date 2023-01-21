/* global describe, it */

'use strict';

const { expect } = require('chai');

module.exports = (shevchenko) => {
  describe(`gender detection`, () => {
    it('should return the grammatical gender', () => {
      expect(shevchenko.detectGender({ firstName: 'Тарас' })).to.be.equal(shevchenko.Gender.Male);
      expect(shevchenko.detectGender({ middleName: 'Григорович' })).to.be.equal(shevchenko.Gender.Male);
      expect(shevchenko.detectGender({ firstName: 'Тарас', middleName: 'Григорович' })).to.be.equal(shevchenko.Gender.Male);
      expect(shevchenko.detectGender({ firstName: 'Лариса', middleName: 'Григорович' })).to.be.equal(shevchenko.Gender.Male);
      expect(shevchenko.detectGender({ firstName: 'Лариса' })).to.be.equal(shevchenko.Gender.Female);
      expect(shevchenko.detectGender({ middleName: 'Петрівна' })).to.be.equal(shevchenko.Gender.Female);
      expect(shevchenko.detectGender({ firstName: 'Лариса', middleName: 'Петрівна' })).to.be.equal(shevchenko.Gender.Female);
      expect(shevchenko.detectGender({ firstName: 'Тарас', middleName: 'Петрівна' })).to.be.equal(shevchenko.Gender.Female);
    });

    it('should return null if the grammatical gender cannot be detected', () => {
      expect(shevchenko.detectGender({ lastName: 'Шевченко' })).to.be.equal(null);
      expect(shevchenko.detectGender({ lastName: 'Косач' })).to.be.equal(null);
      expect(shevchenko.detectGender({ firstName: 'Тара' })).to.be.equal(null);
      expect(shevchenko.detectGender({ firstName: 'Лара' })).to.be.equal(null);
    });
  });
};
