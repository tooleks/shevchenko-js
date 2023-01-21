module.exports = (shevchenko) => {
  describe('shevchenko', () => {
    it('should throw an error for empty arguments list', () => {
      expect(() => shevchenko.inNominative()).toThrow(TypeError, '"anthroponym" must be an object.');
      expect(() => shevchenko.inGenitive()).toThrow(TypeError, '"anthroponym" must be an object.');
      expect(() => shevchenko.inDative()).toThrow(TypeError, '"anthroponym" must be an object.');
      expect(() => shevchenko.inAccusative()).toThrow(TypeError, '"anthroponym" must be an object.');
      expect(() => shevchenko.inAblative()).toThrow(TypeError, '"anthroponym" must be an object.');
      expect(() => shevchenko.inLocative()).toThrow(TypeError, '"anthroponym" must be an object.');
      expect(() => shevchenko.inVocative()).toThrow(TypeError, '"anthroponym" must be an object.');
    });

    it('should throw an error if unsupported gender provided', () => {
      const anthroponym = { gender: 'nonbinary', firstName: 'Тарас', middleName: 'Григорович', lastName: 'Шевченко' };
      expect(() => shevchenko.inNominative(anthroponym)).toThrow(TypeError, '"anthroponym.gender" must be one of the following: "male", "female".');
      expect(() => shevchenko.inGenitive(anthroponym)).toThrow(TypeError, '"anthroponym.gender" must be one of the following: "male", "female".');
      expect(() => shevchenko.inDative(anthroponym)).toThrow(TypeError, '"anthroponym.gender" must be one of the following: "male", "female".');
      expect(() => shevchenko.inAccusative(anthroponym)).toThrow(TypeError, '"anthroponym.gender" must be one of the following: "male", "female".');
      expect(() => shevchenko.inAblative(anthroponym)).toThrow(TypeError, '"anthroponym.gender" must be one of the following: "male", "female".');
      expect(() => shevchenko.inLocative(anthroponym)).toThrow(TypeError, '"anthroponym.gender" must be one of the following: "male", "female".');
      expect(() => shevchenko.inVocative(anthroponym)).toThrow(TypeError, '"anthroponym.gender" must be one of the following: "male", "female".');
    });

    it('should throw an error if none of the name fields provided', () => {
      const anthroponym = { gender: 'male' };
      expect(() => shevchenko.inNominative(anthroponym)).toThrow(TypeError, 'At least one of the following fields must present: "anthroponym.firstName", "anthroponym.middleName", "anthroponym.lastName".');
      expect(() => shevchenko.inGenitive(anthroponym)).toThrow(TypeError, 'At least one of the following fields must present: "anthroponym.firstName", "anthroponym.middleName", "anthroponym.lastName".');
      expect(() => shevchenko.inDative(anthroponym)).toThrow(TypeError, 'At least one of the following fields must present: "anthroponym.firstName", "anthroponym.middleName", "anthroponym.lastName".');
      expect(() => shevchenko.inAccusative(anthroponym)).toThrow(TypeError, 'At least one of the following fields must present: "anthroponym.firstName", "anthroponym.middleName", "anthroponym.lastName".');
      expect(() => shevchenko.inAblative(anthroponym)).toThrow(TypeError, 'At least one of the following fields must present: "anthroponym.firstName", "anthroponym.middleName", "anthroponym.lastName".');
      expect(() => shevchenko.inLocative(anthroponym)).toThrow(TypeError, 'At least one of the following fields must present: "anthroponym.firstName", "anthroponym.middleName", "anthroponym.lastName".');
      expect(() => shevchenko.inVocative(anthroponym)).toThrow(TypeError, 'At least one of the following fields must present: "anthroponym.firstName", "anthroponym.middleName", "anthroponym.lastName".');
    });

    it('should throw an error if provided first name is not a string', () => {
      const anthroponym = { gender: 'male', firstName: null, middleName: 'Григорович', lastName: 'Шевченко' };
      expect(() => shevchenko.inNominative(anthroponym)).toThrow(TypeError, '"anthroponym.firstName" must be a string.');
      expect(() => shevchenko.inGenitive(anthroponym)).toThrow(TypeError, '"anthroponym.firstName" must be a string.');
      expect(() => shevchenko.inDative(anthroponym)).toThrow(TypeError, '"anthroponym.firstName" must be a string.');
      expect(() => shevchenko.inAccusative(anthroponym)).toThrow(TypeError, '"anthroponym.firstName" must be a string.');
      expect(() => shevchenko.inAblative(anthroponym)).toThrow(TypeError, '"anthroponym.firstName" must be a string.');
      expect(() => shevchenko.inLocative(anthroponym)).toThrow(TypeError, '"anthroponym.firstName" must be a string.');
      expect(() => shevchenko.inVocative(anthroponym)).toThrow(TypeError, '"anthroponym.firstName" must be a string.');
    });

    it('should throw an error if provided middle name is not a string', () => {
      const anthroponym = { gender: 'male', firstName: 'Тарас', middleName: null, lastName: 'Шевченко' };
      expect(() => shevchenko.inNominative(anthroponym)).toThrow(TypeError, '"anthroponym.middleName" must be a string.');
      expect(() => shevchenko.inGenitive(anthroponym)).toThrow(TypeError, '"anthroponym.middleName" must be a string.');
      expect(() => shevchenko.inDative(anthroponym)).toThrow(TypeError, '"anthroponym.middleName" must be a string.');
      expect(() => shevchenko.inAccusative(anthroponym)).toThrow(TypeError, '"anthroponym.middleName" must be a string.');
      expect(() => shevchenko.inAblative(anthroponym)).toThrow(TypeError, '"anthroponym.middleName" must be a string.');
      expect(() => shevchenko.inLocative(anthroponym)).toThrow(TypeError, '"anthroponym.middleName" must be a string.');
      expect(() => shevchenko.inVocative(anthroponym)).toThrow(TypeError, '"anthroponym.middleName" must be a string.');
    });

    it('should throw an error if provided last name is not a string', () => {
      const anthroponym = { gender: 'male', firstName: 'Тарас', middleName: 'Григорович', lastName: null };
      expect(() => shevchenko.inNominative(anthroponym)).toThrow(TypeError, '"anthroponym.lastName" must be a string.');
      expect(() => shevchenko.inGenitive(anthroponym)).toThrow(TypeError, '"anthroponym.lastName" must be a string.');
      expect(() => shevchenko.inDative(anthroponym)).toThrow(TypeError, '"anthroponym.lastName" must be a string.');
      expect(() => shevchenko.inAccusative(anthroponym)).toThrow(TypeError, '"anthroponym.lastName" must be a string.');
      expect(() => shevchenko.inAblative(anthroponym)).toThrow(TypeError, '"anthroponym.lastName" must be a string.');
      expect(() => shevchenko.inLocative(anthroponym)).toThrow(TypeError, '"anthroponym.lastName" must be a string.');
      expect(() => shevchenko.inVocative(anthroponym)).toThrow(TypeError, '"anthroponym.lastName" must be a string.');
    });

    it('should inflect anthroponym if first name provided', () => {
      const anthroponym = { gender: 'male', firstName: 'Тарас' };
      expect(shevchenko.inNominative(anthroponym)).toStrictEqual({ gender: 'male', firstName: 'Тарас' });
      expect(shevchenko.inGenitive(anthroponym)).toStrictEqual({ gender: 'male', firstName: 'Тараса' });
      expect(shevchenko.inDative(anthroponym)).toStrictEqual({ gender: 'male', firstName: 'Тарасу' });
      expect(shevchenko.inAccusative(anthroponym)).toStrictEqual({ gender: 'male', firstName: 'Тараса' });
      expect(shevchenko.inAblative(anthroponym)).toStrictEqual({ gender: 'male', firstName: 'Тарасом' });
      expect(shevchenko.inLocative(anthroponym)).toStrictEqual({ gender: 'male', firstName: 'Тарасові' });
      expect(shevchenko.inVocative(anthroponym)).toStrictEqual({ gender: 'male', firstName: 'Тарасе' });
    });

    it('should inflect anthroponym if middle name provided', () => {
      const anthroponym = { gender: 'male', middleName: 'Григорович' };
      expect(shevchenko.inNominative(anthroponym)).toStrictEqual({ gender: 'male', middleName: 'Григорович' });
      expect(shevchenko.inGenitive(anthroponym)).toStrictEqual({ gender: 'male', middleName: 'Григоровича' });
      expect(shevchenko.inDative(anthroponym)).toStrictEqual({ gender: 'male', middleName: 'Григоровичу' });
      expect(shevchenko.inAccusative(anthroponym)).toStrictEqual({ gender: 'male', middleName: 'Григоровича' });
      expect(shevchenko.inAblative(anthroponym)).toStrictEqual({ gender: 'male', middleName: 'Григоровичем' });
      expect(shevchenko.inLocative(anthroponym)).toStrictEqual({ gender: 'male', middleName: 'Григоровичу' });
      expect(shevchenko.inVocative(anthroponym)).toStrictEqual({ gender: 'male', middleName: 'Григоровичу' });
    });

    it('should inflect anthroponym if last name provided', () => {
      const anthroponym = { gender: 'male', lastName: 'Шевченко' };
      expect(shevchenko.inNominative(anthroponym)).toStrictEqual({ gender: 'male', lastName: 'Шевченко' });
      expect(shevchenko.inGenitive(anthroponym)).toStrictEqual({ gender: 'male', lastName: 'Шевченка' });
      expect(shevchenko.inDative(anthroponym)).toStrictEqual({ gender: 'male', lastName: 'Шевченку' });
      expect(shevchenko.inAccusative(anthroponym)).toStrictEqual({ gender: 'male', lastName: 'Шевченка' });
      expect(shevchenko.inAblative(anthroponym)).toStrictEqual({ gender: 'male', lastName: 'Шевченком' });
      expect(shevchenko.inLocative(anthroponym)).toStrictEqual({ gender: 'male', lastName: 'Шевченкові' });
      expect(shevchenko.inVocative(anthroponym)).toStrictEqual({ gender: 'male', lastName: 'Шевченку' });
    });

    it('should inflect anthroponym if full name provided', () => {
      const anthroponym = { gender: 'male', firstName: 'Тарас', middleName: 'Григорович', lastName: 'Шевченко' };

      expect(shevchenko.inNominative(anthroponym)).toStrictEqual({
        gender: 'male',
        firstName: 'Тарас',
        middleName: 'Григорович',
        lastName: 'Шевченко'
      });

      expect(shevchenko.inGenitive(anthroponym)).toStrictEqual({
        gender: 'male',
        firstName: 'Тараса',
        middleName: 'Григоровича',
        lastName: 'Шевченка'
      });

      expect(shevchenko.inDative(anthroponym)).toStrictEqual({
        gender: 'male',
        firstName: 'Тарасу',
        middleName: 'Григоровичу',
        lastName: 'Шевченку'
      });

      expect(shevchenko.inAccusative(anthroponym)).toStrictEqual({
        gender: 'male',
        firstName: 'Тараса',
        middleName: 'Григоровича',
        lastName: 'Шевченка'
      });

      expect(shevchenko.inAblative(anthroponym)).toStrictEqual({
        gender: 'male',
        firstName: 'Тарасом',
        middleName: 'Григоровичем',
        lastName: 'Шевченком'
      });

      expect(shevchenko.inLocative(anthroponym)).toStrictEqual({
        gender: 'male',
        firstName: 'Тарасові',
        middleName: 'Григоровичу',
        lastName: 'Шевченкові'
      });

      expect(shevchenko.inVocative(anthroponym)).toStrictEqual({
        gender: 'male',
        firstName: 'Тарасе',
        middleName: 'Григоровичу',
        lastName: 'Шевченку'
      });
    });
  });
}
