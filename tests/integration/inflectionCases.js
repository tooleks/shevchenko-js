import {expect} from 'chai';

export default function(shevchenko) {
  describe('shevchenko.INFLECTION_CASES', function() {
    it('should return valid inflection cases', function() {
      expect(shevchenko.INFLECTION_CASES).to.be.deep.equal({
        NOMINATIVE: 'nominative',
        GENITIVE: 'genitive',
        DATIVE: 'dative',
        ACCUSATIVE: 'accusative',
        ABLATIVE: 'ablative',
        LOCATIVE: 'locative',
        VOCATIVE: 'vocative',
      });
    });
  });
}
