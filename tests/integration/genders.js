import { expect } from 'chai';

export default function(shevchenko) {
  describe('shevchenko.GENDERS', function() {
    it('should return valid genders', function() {
      expect(shevchenko.GENDERS).to.be.deep.equal({
        MALE: 'male',
        FEMALE: 'female',
      });
    });
  });
}
