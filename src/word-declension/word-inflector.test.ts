import { describe, expect, it } from 'vitest';
import { GrammaticalCase, GrammaticalGender, WordClass } from '../language';
import { wordInflector } from './bootstrap';

describe('WordInflector', () => {
  const params = {
    grammaticalCase: GrammaticalCase.GENITIVE,
    gender: GrammaticalGender.MASCULINE,
    wordClass: WordClass.NOUN,
  };

  it('should prefer the rule for the requested application type over a general rule of equal priority', async () => {
    expect(
      await wordInflector.inflect('Гайдар', { ...params, applicationType: 'familyName' }),
    ).toBe('Гайдара');
    expect(
      await wordInflector.inflect('Гончар', { ...params, applicationType: 'familyName' }),
    ).toBe('Гончара');
  });

  it('should prefer a general rule over an application-specific rule of equal priority when no application type is requested', async () => {
    expect(await wordInflector.inflect('гайдар', params)).toBe('гайдаря');
    expect(await wordInflector.inflect('гончар', params)).toBe('гончаря');
  });
});
