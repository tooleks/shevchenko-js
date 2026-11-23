import { mountSuspended } from '@nuxt/test-utils/runtime';
import * as shevchenko from 'shevchenko';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import DeclensionSlideshow, { type SlideshowField } from '~/components/declension-slideshow.vue';

const SLIDE_DURATION = 5_000;

const fields: SlideshowField[] = ['givenName', 'familyName'];

const props = {
  inputs: [
    {
      gender: shevchenko.GrammaticalGender.MASCULINE,
      givenName: 'Тарас',
      familyName: 'Шевченко',
    },
    {
      gender: shevchenko.GrammaticalGender.MASCULINE,
      givenName: 'Іван',
      familyName: 'Франко',
    },
  ],
  grammaticalCase: shevchenko.GrammaticalCase.VOCATIVE,
  fields,
};

type Wrapper = Awaited<ReturnType<typeof mountSuspended<typeof DeclensionSlideshow>>>;

function getSlide(wrapper: Wrapper): string {
  return wrapper.get('.slideshow-name-output').text();
}

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
  vi.useRealTimers();
});

describe('declension slideshow', () => {
  it('shows the slide declined in the given grammatical case', async () => {
    const wrapper = await mountSuspended(DeclensionSlideshow, { props });

    expect(wrapper.get('.slideshow-function').text()).toBe('inVocative');
    expect(getSlide(wrapper)).toBe('Тарасе Шевченку');
  });

  it('shows the next slide after a while', async () => {
    const wrapper = await mountSuspended(DeclensionSlideshow, { props });

    await vi.advanceTimersByTimeAsync(SLIDE_DURATION);

    await vi.waitFor(() => expect(getSlide(wrapper)).toBe('Іване Франку'));
  });

  it('pauses and resumes the slideshow', async () => {
    const wrapper = await mountSuspended(DeclensionSlideshow, { props });
    const toggle = wrapper.get('.slideshow-toggle');

    await toggle.trigger('click');
    await vi.advanceTimersByTimeAsync(SLIDE_DURATION);

    expect(toggle.attributes('aria-label')).toBe('Продовжити слайдшоу');
    expect(wrapper.find('.slideshow-progress').exists()).toBe(false);
    expect(getSlide(wrapper)).toBe('Тарасе Шевченку');

    await toggle.trigger('click');
    await vi.advanceTimersByTimeAsync(SLIDE_DURATION);

    expect(toggle.attributes('aria-label')).toBe('Призупинити слайдшоу');
    await vi.waitFor(() => expect(getSlide(wrapper)).toBe('Іване Франку'));
  });

  it('pauses while the mouse is over the slideshow', async () => {
    const wrapper = await mountSuspended(DeclensionSlideshow, { props });
    const slideshow = wrapper.get('.slideshow');

    await slideshow.trigger('pointerenter', { pointerType: 'mouse' });
    await vi.advanceTimersByTimeAsync(SLIDE_DURATION);

    expect(getSlide(wrapper)).toBe('Тарасе Шевченку');

    await slideshow.trigger('pointerleave', { pointerType: 'mouse' });
    await vi.advanceTimersByTimeAsync(SLIDE_DURATION);

    await vi.waitFor(() => expect(getSlide(wrapper)).toBe('Іване Франку'));
  });

  it('keeps playing after a touch on the slideshow', async () => {
    const wrapper = await mountSuspended(DeclensionSlideshow, { props });

    await wrapper.get('.slideshow').trigger('pointerenter', { pointerType: 'touch' });
    await vi.advanceTimersByTimeAsync(SLIDE_DURATION);

    await vi.waitFor(() => expect(getSlide(wrapper)).toBe('Іване Франку'));
  });
});
