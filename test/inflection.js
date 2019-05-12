import { expect } from "chai";
import samples from "./samples.json";

export default function(shevchenko) {
  samples.forEach((sample) => {
    const anthroponym = { gender: sample.gender, ...sample.inflectionCases.nominative };

    describe(`"${anthroponym.firstName} ${anthroponym.middleName} ${anthroponym.lastName}" inflection`, function() {
      Object.keys(sample.inflectionCases).forEach((inflectionCase) => {
        it(`should inflect in ${inflectionCase} grammatical case using root function`, function() {
          const result = shevchenko(anthroponym, inflectionCase);
          expect(result.firstName).to.be.equal(sample.inflectionCases[inflectionCase].firstName);
          expect(result.middleName).to.be.equal(sample.inflectionCases[inflectionCase].middleName);
          expect(result.lastName).to.be.equal(sample.inflectionCases[inflectionCase].lastName);
        });

        it(`should inflect in ${inflectionCase} grammatical case using inflection method`, function() {
          const methodName = "in" + inflectionCase.charAt(0).toUpperCase() + inflectionCase.slice(1);
          const result = shevchenko[methodName](anthroponym);
          expect(result.firstName).to.be.equal(sample.inflectionCases[inflectionCase].firstName);
          expect(result.middleName).to.be.equal(sample.inflectionCases[inflectionCase].middleName);
          expect(result.lastName).to.be.equal(sample.inflectionCases[inflectionCase].lastName);
        });
      });
    });
  });
}
