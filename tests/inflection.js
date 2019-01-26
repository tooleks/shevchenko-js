import {expect} from 'chai';
import inflections from './src/inflections.json';

export default function(shevchenko) {
  describe('inflection test', function() {
    inflections.forEach((inflection) => {
      const anthroponym = {
        gender: inflection.gender,
        ...inflection.inflectionCases.nominative,
      };

      const fullName = `${anthroponym.lastName} ${anthroponym.firstName} ${anthroponym.middleName}`;

      Object.keys(inflection.inflectionCases).forEach((inflectionCase) => {
        it(`should inflect correctly "${fullName}" in "${inflectionCase}" case via default function`, function() {
          const result = shevchenko(anthroponym, inflectionCase);
          expect(result.firstName).to.be.equal(inflection.inflectionCases[inflectionCase].firstName);
          expect(result.middleName).to.be.equal(inflection.inflectionCases[inflectionCase].middleName);
          expect(result.lastName).to.be.equal(inflection.inflectionCases[inflectionCase].lastName);
        });

        it(`should inflect correctly "${fullName}" in "${inflectionCase}" case via "in" function`, function() {
          const methodName = 'in' + inflectionCase.charAt(0).toUpperCase() + inflectionCase.slice(1);
          const result = shevchenko[methodName](anthroponym);
          expect(result.firstName).to.be.equal(inflection.inflectionCases[inflectionCase].firstName);
          expect(result.middleName).to.be.equal(inflection.inflectionCases[inflectionCase].middleName);
          expect(result.lastName).to.be.equal(inflection.inflectionCases[inflectionCase].lastName);
        });
      });
    });
  });
}
