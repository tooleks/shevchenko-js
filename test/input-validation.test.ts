/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as shevchenko from '../src';

describe('shevchenko', () => {
  it('should throw an error for empty arguments list', async () => {
    // @ts-ignore
    await expect(() => shevchenko.inNominative()).rejects.toStrictEqual(
      new TypeError('"anthroponym" must be an object.'),
    );

    // @ts-ignore
    await expect(() => shevchenko.inGenitive()).rejects.toStrictEqual(
      new TypeError('"anthroponym" must be an object.'),
    );

    // @ts-ignore
    await expect(() => shevchenko.inDative()).rejects.toStrictEqual(
      new TypeError('"anthroponym" must be an object.'),
    );

    // @ts-ignore
    await expect(() => shevchenko.inAccusative()).rejects.toStrictEqual(
      new TypeError('"anthroponym" must be an object.'),
    );

    // @ts-ignore
    await expect(() => shevchenko.inAblative()).rejects.toStrictEqual(
      new TypeError('"anthroponym" must be an object.'),
    );

    // @ts-ignore
    await expect(() => shevchenko.inLocative()).rejects.toStrictEqual(
      new TypeError('"anthroponym" must be an object.'),
    );

    // @ts-ignore
    await expect(() => shevchenko.inVocative()).rejects.toStrictEqual(
      new TypeError('"anthroponym" must be an object.'),
    );
  });

  it('should throw an error if unsupported gender provided', async () => {
    // @ts-ignore
    const anthroponym = {
      gender: 'animate',
      firstName: 'Тарас',
      middleName: 'Григорович',
      lastName: 'Шевченко',
    } as shevchenko.Anthroponym;

    await expect(() => shevchenko.inNominative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"anthroponym.gender" must be one of the following: "male", "female".'),
    );

    await expect(() => shevchenko.inGenitive(anthroponym)).rejects.toStrictEqual(
      new TypeError('"anthroponym.gender" must be one of the following: "male", "female".'),
    );

    await expect(() => shevchenko.inDative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"anthroponym.gender" must be one of the following: "male", "female".'),
    );

    await expect(() => shevchenko.inAccusative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"anthroponym.gender" must be one of the following: "male", "female".'),
    );

    await expect(() => shevchenko.inAblative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"anthroponym.gender" must be one of the following: "male", "female".'),
    );

    await expect(() => shevchenko.inLocative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"anthroponym.gender" must be one of the following: "male", "female".'),
    );

    await expect(() => shevchenko.inVocative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"anthroponym.gender" must be one of the following: "male", "female".'),
    );
  });

  it('should throw an error if none of the name fields provided', async () => {
    // @ts-ignore
    const anthroponym = {
      gender: 'male',
    } as shevchenko.Anthroponym;

    await expect(() => shevchenko.inNominative(anthroponym)).rejects.toStrictEqual(
      new TypeError(
        'At least one of the following fields must present: "anthroponym.firstName", "anthroponym.middleName", "anthroponym.lastName".',
      ),
    );

    await expect(() => shevchenko.inGenitive(anthroponym)).rejects.toStrictEqual(
      new TypeError(
        'At least one of the following fields must present: "anthroponym.firstName", "anthroponym.middleName", "anthroponym.lastName".',
      ),
    );

    await expect(() => shevchenko.inDative(anthroponym)).rejects.toStrictEqual(
      new TypeError(
        'At least one of the following fields must present: "anthroponym.firstName", "anthroponym.middleName", "anthroponym.lastName".',
      ),
    );

    await expect(() => shevchenko.inAccusative(anthroponym)).rejects.toStrictEqual(
      new TypeError(
        'At least one of the following fields must present: "anthroponym.firstName", "anthroponym.middleName", "anthroponym.lastName".',
      ),
    );

    await expect(() => shevchenko.inAblative(anthroponym)).rejects.toStrictEqual(
      new TypeError(
        'At least one of the following fields must present: "anthroponym.firstName", "anthroponym.middleName", "anthroponym.lastName".',
      ),
    );

    await expect(() => shevchenko.inLocative(anthroponym)).rejects.toStrictEqual(
      new TypeError(
        'At least one of the following fields must present: "anthroponym.firstName", "anthroponym.middleName", "anthroponym.lastName".',
      ),
    );

    await expect(() => shevchenko.inVocative(anthroponym)).rejects.toStrictEqual(
      new TypeError(
        'At least one of the following fields must present: "anthroponym.firstName", "anthroponym.middleName", "anthroponym.lastName".',
      ),
    );
  });

  it('should throw an error if provided first name is not a string', async () => {
    // @ts-ignore
    const anthroponym = {
      gender: 'male',
      firstName: null,
      middleName: 'Григорович',
      lastName: 'Шевченко',
    } as shevchenko.Anthroponym;

    await expect(() => shevchenko.inNominative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"anthroponym.firstName" must be a string.'),
    );

    await expect(() => shevchenko.inGenitive(anthroponym)).rejects.toStrictEqual(
      new TypeError('"anthroponym.firstName" must be a string.'),
    );

    await expect(() => shevchenko.inDative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"anthroponym.firstName" must be a string.'),
    );

    await expect(() => shevchenko.inAccusative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"anthroponym.firstName" must be a string.'),
    );

    await expect(() => shevchenko.inAblative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"anthroponym.firstName" must be a string.'),
    );

    await expect(() => shevchenko.inLocative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"anthroponym.firstName" must be a string.'),
    );

    await expect(() => shevchenko.inVocative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"anthroponym.firstName" must be a string.'),
    );
  });

  it('should throw an error if provided middle name is not a string', async () => {
    // @ts-ignore
    const anthroponym = {
      gender: 'male',
      firstName: 'Тарас',
      middleName: null,
      lastName: 'Шевченко',
    } as shevchenko.Anthroponym;

    await expect(() => shevchenko.inNominative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"anthroponym.middleName" must be a string.'),
    );

    await expect(() => shevchenko.inGenitive(anthroponym)).rejects.toStrictEqual(
      new TypeError('"anthroponym.middleName" must be a string.'),
    );

    await expect(() => shevchenko.inDative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"anthroponym.middleName" must be a string.'),
    );

    await expect(() => shevchenko.inAccusative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"anthroponym.middleName" must be a string.'),
    );

    await expect(() => shevchenko.inAblative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"anthroponym.middleName" must be a string.'),
    );

    await expect(() => shevchenko.inLocative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"anthroponym.middleName" must be a string.'),
    );

    await expect(() => shevchenko.inVocative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"anthroponym.middleName" must be a string.'),
    );
  });

  it('should throw an error if provided last name is not a string', async () => {
    // @ts-ignore
    const anthroponym = {
      gender: 'male',
      firstName: 'Тарас',
      middleName: 'Григорович',
      lastName: null,
    } as shevchenko.Anthroponym;

    await expect(() => shevchenko.inNominative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"anthroponym.lastName" must be a string.'),
    );

    await expect(() => shevchenko.inGenitive(anthroponym)).rejects.toStrictEqual(
      new TypeError('"anthroponym.lastName" must be a string.'),
    );

    await expect(() => shevchenko.inDative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"anthroponym.lastName" must be a string.'),
    );

    await expect(() => shevchenko.inAccusative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"anthroponym.lastName" must be a string.'),
    );

    await expect(() => shevchenko.inAblative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"anthroponym.lastName" must be a string.'),
    );

    expect(() => shevchenko.inLocative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"anthroponym.lastName" must be a string.'),
    );

    await expect(() => shevchenko.inVocative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"anthroponym.lastName" must be a string.'),
    );
  });

  it('should inflect anthroponym if first name provided', async () => {
    // @ts-ignore
    const anthroponym = {
      gender: 'male',
      firstName: 'Тарас',
    } as shevchenko.Anthroponym;

    await expect(shevchenko.inNominative(anthroponym)).resolves.toStrictEqual({
      gender: 'male',
      firstName: 'Тарас',
    });

    await expect(shevchenko.inGenitive(anthroponym)).resolves.toStrictEqual({
      gender: 'male',
      firstName: 'Тараса',
    });

    await expect(shevchenko.inDative(anthroponym)).resolves.toStrictEqual({
      gender: 'male',
      firstName: 'Тарасу',
    });

    await expect(shevchenko.inAccusative(anthroponym)).resolves.toStrictEqual({
      gender: 'male',
      firstName: 'Тараса',
    });

    await expect(shevchenko.inAblative(anthroponym)).resolves.toStrictEqual({
      gender: 'male',
      firstName: 'Тарасом',
    });

    await expect(shevchenko.inLocative(anthroponym)).resolves.toStrictEqual({
      gender: 'male',
      firstName: 'Тарасові',
    });

    await expect(shevchenko.inVocative(anthroponym)).resolves.toStrictEqual({
      gender: 'male',
      firstName: 'Тарасе',
    });
  });

  it('should inflect anthroponym if middle name provided', async () => {
    // @ts-ignore
    const anthroponym = {
      gender: 'male',
      middleName: 'Григорович',
    } as shevchenko.Anthroponym;

    await expect(shevchenko.inNominative(anthroponym)).resolves.toStrictEqual({
      gender: 'male',
      middleName: 'Григорович',
    });

    await expect(shevchenko.inGenitive(anthroponym)).resolves.toStrictEqual({
      gender: 'male',
      middleName: 'Григоровича',
    });

    await expect(shevchenko.inDative(anthroponym)).resolves.toStrictEqual({
      gender: 'male',
      middleName: 'Григоровичу',
    });

    await expect(shevchenko.inAccusative(anthroponym)).resolves.toStrictEqual({
      gender: 'male',
      middleName: 'Григоровича',
    });

    await expect(shevchenko.inAblative(anthroponym)).resolves.toStrictEqual({
      gender: 'male',
      middleName: 'Григоровичем',
    });

    await expect(shevchenko.inLocative(anthroponym)).resolves.toStrictEqual({
      gender: 'male',
      middleName: 'Григоровичу',
    });

    await expect(shevchenko.inVocative(anthroponym)).resolves.toStrictEqual({
      gender: 'male',
      middleName: 'Григоровичу',
    });
  });

  it('should inflect anthroponym if last name provided', async () => {
    // @ts-ignore
    const anthroponym = {
      gender: 'male',
      lastName: 'Шевченко',
    } as shevchenko.Anthroponym;

    await expect(shevchenko.inNominative(anthroponym)).resolves.toStrictEqual({
      gender: 'male',
      lastName: 'Шевченко',
    });

    await expect(shevchenko.inGenitive(anthroponym)).resolves.toStrictEqual({
      gender: 'male',
      lastName: 'Шевченка',
    });

    await expect(shevchenko.inDative(anthroponym)).resolves.toStrictEqual({
      gender: 'male',
      lastName: 'Шевченку',
    });

    await expect(shevchenko.inAccusative(anthroponym)).resolves.toStrictEqual({
      gender: 'male',
      lastName: 'Шевченка',
    });

    await expect(shevchenko.inAblative(anthroponym)).resolves.toStrictEqual({
      gender: 'male',
      lastName: 'Шевченком',
    });

    await expect(shevchenko.inLocative(anthroponym)).resolves.toStrictEqual({
      gender: 'male',
      lastName: 'Шевченкові',
    });

    await expect(shevchenko.inVocative(anthroponym)).resolves.toStrictEqual({
      gender: 'male',
      lastName: 'Шевченку',
    });
  });

  it('should inflect anthroponym if full name provided', async () => {
    // @ts-ignore
    const anthroponym = {
      gender: 'male',
      firstName: 'Тарас',
      middleName: 'Григорович',
      lastName: 'Шевченко',
    } as shevchenko.Anthroponym;

    await expect(shevchenko.inNominative(anthroponym)).resolves.toStrictEqual({
      gender: 'male',
      firstName: 'Тарас',
      middleName: 'Григорович',
      lastName: 'Шевченко',
    });

    await expect(shevchenko.inGenitive(anthroponym)).resolves.toStrictEqual({
      gender: 'male',
      firstName: 'Тараса',
      middleName: 'Григоровича',
      lastName: 'Шевченка',
    });

    await expect(shevchenko.inDative(anthroponym)).resolves.toStrictEqual({
      gender: 'male',
      firstName: 'Тарасу',
      middleName: 'Григоровичу',
      lastName: 'Шевченку',
    });

    await expect(shevchenko.inAccusative(anthroponym)).resolves.toStrictEqual({
      gender: 'male',
      firstName: 'Тараса',
      middleName: 'Григоровича',
      lastName: 'Шевченка',
    });

    await expect(shevchenko.inAblative(anthroponym)).resolves.toStrictEqual({
      gender: 'male',
      firstName: 'Тарасом',
      middleName: 'Григоровичем',
      lastName: 'Шевченком',
    });

    await expect(shevchenko.inLocative(anthroponym)).resolves.toStrictEqual({
      gender: 'male',
      firstName: 'Тарасові',
      middleName: 'Григоровичу',
      lastName: 'Шевченкові',
    });

    await expect(shevchenko.inVocative(anthroponym)).resolves.toStrictEqual({
      gender: 'male',
      firstName: 'Тарасе',
      middleName: 'Григоровичу',
      lastName: 'Шевченку',
    });
  });
});
