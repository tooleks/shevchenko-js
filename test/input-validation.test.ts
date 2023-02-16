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
      givenName: 'Тарас',
      patronymicName: 'Григорович',
      familyName: 'Шевченко',
    } as shevchenko.InflectAnthroponymParams;

    await expect(() => shevchenko.inNominative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"gender" must be one of the following: "masculine", "feminine".'),
    );

    await expect(() => shevchenko.inGenitive(anthroponym)).rejects.toStrictEqual(
      new TypeError('"gender" must be one of the following: "masculine", "feminine".'),
    );

    await expect(() => shevchenko.inDative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"gender" must be one of the following: "masculine", "feminine".'),
    );

    await expect(() => shevchenko.inAccusative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"gender" must be one of the following: "masculine", "feminine".'),
    );

    await expect(() => shevchenko.inAblative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"gender" must be one of the following: "masculine", "feminine".'),
    );

    await expect(() => shevchenko.inLocative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"gender" must be one of the following: "masculine", "feminine".'),
    );

    await expect(() => shevchenko.inVocative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"gender" must be one of the following: "masculine", "feminine".'),
    );
  });

  it('should throw an error if none of the name fields provided', async () => {
    // @ts-ignore
    const anthroponym = {
      gender: 'masculine',
    } as shevchenko.InflectAnthroponymParams;

    await expect(() => shevchenko.inNominative(anthroponym)).rejects.toStrictEqual(
      new TypeError(
        'At least one of the following fields must present: "givenName", "patronymicName", "familyName".',
      ),
    );

    await expect(() => shevchenko.inGenitive(anthroponym)).rejects.toStrictEqual(
      new TypeError(
        'At least one of the following fields must present: "givenName", "patronymicName", "familyName".',
      ),
    );

    await expect(() => shevchenko.inDative(anthroponym)).rejects.toStrictEqual(
      new TypeError(
        'At least one of the following fields must present: "givenName", "patronymicName", "familyName".',
      ),
    );

    await expect(() => shevchenko.inAccusative(anthroponym)).rejects.toStrictEqual(
      new TypeError(
        'At least one of the following fields must present: "givenName", "patronymicName", "familyName".',
      ),
    );

    await expect(() => shevchenko.inAblative(anthroponym)).rejects.toStrictEqual(
      new TypeError(
        'At least one of the following fields must present: "givenName", "patronymicName", "familyName".',
      ),
    );

    await expect(() => shevchenko.inLocative(anthroponym)).rejects.toStrictEqual(
      new TypeError(
        'At least one of the following fields must present: "givenName", "patronymicName", "familyName".',
      ),
    );

    await expect(() => shevchenko.inVocative(anthroponym)).rejects.toStrictEqual(
      new TypeError(
        'At least one of the following fields must present: "givenName", "patronymicName", "familyName".',
      ),
    );
  });

  it('should throw an error if provided first name is not a string', async () => {
    // @ts-ignore
    const anthroponym = {
      gender: 'masculine',
      givenName: null,
      patronymicName: 'Григорович',
      familyName: 'Шевченко',
    } as shevchenko.InflectAnthroponymParams;

    await expect(() => shevchenko.inNominative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"givenName" must be a string.'),
    );

    await expect(() => shevchenko.inGenitive(anthroponym)).rejects.toStrictEqual(
      new TypeError('"givenName" must be a string.'),
    );

    await expect(() => shevchenko.inDative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"givenName" must be a string.'),
    );

    await expect(() => shevchenko.inAccusative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"givenName" must be a string.'),
    );

    await expect(() => shevchenko.inAblative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"givenName" must be a string.'),
    );

    await expect(() => shevchenko.inLocative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"givenName" must be a string.'),
    );

    await expect(() => shevchenko.inVocative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"givenName" must be a string.'),
    );
  });

  it('should throw an error if provided middle name is not a string', async () => {
    // @ts-ignore
    const anthroponym = {
      gender: 'masculine',
      givenName: 'Тарас',
      patronymicName: null,
      familyName: 'Шевченко',
    } as shevchenko.InflectAnthroponymParams;

    await expect(() => shevchenko.inNominative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"patronymicName" must be a string.'),
    );

    await expect(() => shevchenko.inGenitive(anthroponym)).rejects.toStrictEqual(
      new TypeError('"patronymicName" must be a string.'),
    );

    await expect(() => shevchenko.inDative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"patronymicName" must be a string.'),
    );

    await expect(() => shevchenko.inAccusative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"patronymicName" must be a string.'),
    );

    await expect(() => shevchenko.inAblative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"patronymicName" must be a string.'),
    );

    await expect(() => shevchenko.inLocative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"patronymicName" must be a string.'),
    );

    await expect(() => shevchenko.inVocative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"patronymicName" must be a string.'),
    );
  });

  it('should throw an error if provided last name is not a string', async () => {
    // @ts-ignore
    const anthroponym = {
      gender: 'masculine',
      givenName: 'Тарас',
      patronymicName: 'Григорович',
      familyName: null,
    } as shevchenko.InflectAnthroponymParams;

    await expect(() => shevchenko.inNominative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"familyName" must be a string.'),
    );

    await expect(() => shevchenko.inGenitive(anthroponym)).rejects.toStrictEqual(
      new TypeError('"familyName" must be a string.'),
    );

    await expect(() => shevchenko.inDative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"familyName" must be a string.'),
    );

    await expect(() => shevchenko.inAccusative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"familyName" must be a string.'),
    );

    await expect(() => shevchenko.inAblative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"familyName" must be a string.'),
    );

    expect(() => shevchenko.inLocative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"familyName" must be a string.'),
    );

    await expect(() => shevchenko.inVocative(anthroponym)).rejects.toStrictEqual(
      new TypeError('"familyName" must be a string.'),
    );
  });

  it('should inflect anthroponym if first name provided', async () => {
    // @ts-ignore
    const anthroponym = {
      gender: 'masculine',
      givenName: 'Тарас',
    } as shevchenko.InflectAnthroponymParams;

    await expect(shevchenko.inNominative(anthroponym)).resolves.toStrictEqual({
      givenName: 'Тарас',
    });

    await expect(shevchenko.inGenitive(anthroponym)).resolves.toStrictEqual({
      givenName: 'Тараса',
    });

    await expect(shevchenko.inDative(anthroponym)).resolves.toStrictEqual({
      givenName: 'Тарасу',
    });

    await expect(shevchenko.inAccusative(anthroponym)).resolves.toStrictEqual({
      givenName: 'Тараса',
    });

    await expect(shevchenko.inAblative(anthroponym)).resolves.toStrictEqual({
      givenName: 'Тарасом',
    });

    await expect(shevchenko.inLocative(anthroponym)).resolves.toStrictEqual({
      givenName: 'Тарасові',
    });

    await expect(shevchenko.inVocative(anthroponym)).resolves.toStrictEqual({
      givenName: 'Тарасе',
    });
  });

  it('should inflect anthroponym if middle name provided', async () => {
    // @ts-ignore
    const anthroponym = {
      gender: 'masculine',
      patronymicName: 'Григорович',
    } as shevchenko.InflectAnthroponymParams;

    await expect(shevchenko.inNominative(anthroponym)).resolves.toStrictEqual({
      patronymicName: 'Григорович',
    });

    await expect(shevchenko.inGenitive(anthroponym)).resolves.toStrictEqual({
      patronymicName: 'Григоровича',
    });

    await expect(shevchenko.inDative(anthroponym)).resolves.toStrictEqual({
      patronymicName: 'Григоровичу',
    });

    await expect(shevchenko.inAccusative(anthroponym)).resolves.toStrictEqual({
      patronymicName: 'Григоровича',
    });

    await expect(shevchenko.inAblative(anthroponym)).resolves.toStrictEqual({
      patronymicName: 'Григоровичем',
    });

    await expect(shevchenko.inLocative(anthroponym)).resolves.toStrictEqual({
      patronymicName: 'Григоровичу',
    });

    await expect(shevchenko.inVocative(anthroponym)).resolves.toStrictEqual({
      patronymicName: 'Григоровичу',
    });
  });

  it('should inflect anthroponym if last name provided', async () => {
    // @ts-ignore
    const anthroponym = {
      gender: 'masculine',
      familyName: 'Шевченко',
    } as shevchenko.InflectAnthroponymParams;

    await expect(shevchenko.inNominative(anthroponym)).resolves.toStrictEqual({
      familyName: 'Шевченко',
    });

    await expect(shevchenko.inGenitive(anthroponym)).resolves.toStrictEqual({
      familyName: 'Шевченка',
    });

    await expect(shevchenko.inDative(anthroponym)).resolves.toStrictEqual({
      familyName: 'Шевченку',
    });

    await expect(shevchenko.inAccusative(anthroponym)).resolves.toStrictEqual({
      familyName: 'Шевченка',
    });

    await expect(shevchenko.inAblative(anthroponym)).resolves.toStrictEqual({
      familyName: 'Шевченком',
    });

    await expect(shevchenko.inLocative(anthroponym)).resolves.toStrictEqual({
      familyName: 'Шевченкові',
    });

    await expect(shevchenko.inVocative(anthroponym)).resolves.toStrictEqual({
      familyName: 'Шевченку',
    });
  });

  it('should inflect anthroponym if full name provided', async () => {
    // @ts-ignore
    const anthroponym = {
      gender: 'masculine',
      givenName: 'Тарас',
      patronymicName: 'Григорович',
      familyName: 'Шевченко',
    } as shevchenko.InflectAnthroponymParams;

    await expect(shevchenko.inNominative(anthroponym)).resolves.toStrictEqual({
      givenName: 'Тарас',
      patronymicName: 'Григорович',
      familyName: 'Шевченко',
    });

    await expect(shevchenko.inGenitive(anthroponym)).resolves.toStrictEqual({
      givenName: 'Тараса',
      patronymicName: 'Григоровича',
      familyName: 'Шевченка',
    });

    await expect(shevchenko.inDative(anthroponym)).resolves.toStrictEqual({
      givenName: 'Тарасу',
      patronymicName: 'Григоровичу',
      familyName: 'Шевченку',
    });

    await expect(shevchenko.inAccusative(anthroponym)).resolves.toStrictEqual({
      givenName: 'Тараса',
      patronymicName: 'Григоровича',
      familyName: 'Шевченка',
    });

    await expect(shevchenko.inAblative(anthroponym)).resolves.toStrictEqual({
      givenName: 'Тарасом',
      patronymicName: 'Григоровичем',
      familyName: 'Шевченком',
    });

    await expect(shevchenko.inLocative(anthroponym)).resolves.toStrictEqual({
      givenName: 'Тарасові',
      patronymicName: 'Григоровичу',
      familyName: 'Шевченкові',
    });

    await expect(shevchenko.inVocative(anthroponym)).resolves.toStrictEqual({
      givenName: 'Тарасе',
      patronymicName: 'Григоровичу',
      familyName: 'Шевченку',
    });
  });
});
