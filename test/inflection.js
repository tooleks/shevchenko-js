/* global describe, it */

'use strict';

const { expect } = require('chai');
const capitalize = require('lodash/capitalize');
const samples = require('./samples.json');

module.exports = function (shevchenko) {
  samples.forEach((sample) => {
    const anthroponym = { gender: sample.gender, ...sample.inflectionCases.nominative };
    describe(`"${anthroponym.firstName} ${anthroponym.middleName} ${anthroponym.lastName}" inflection`, function () {
      Object.keys(sample.inflectionCases).forEach((inflectionCase) => {
        it(`should inflect in ${inflectionCase} grammatical case`, function () {
          const methodName = 'in' + capitalize(inflectionCase);
          const result = shevchenko[methodName](anthroponym);
          expect(result.firstName).to.be.equal(sample.inflectionCases[inflectionCase].firstName);
          expect(result.middleName).to.be.equal(sample.inflectionCases[inflectionCase].middleName);
          expect(result.lastName).to.be.equal(sample.inflectionCases[inflectionCase].lastName);
        });
      });
    });
  });
}
