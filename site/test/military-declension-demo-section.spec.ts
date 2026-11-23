import { mountSuspended } from '@nuxt/test-utils/runtime';
import { afterEach, beforeEach, describe, expect, it, vi, type MockInstance } from 'vitest';
import '~/init';
import MilitaryDeclensionDemoSection from '~/components/military/declension-demo-section.vue';

type Wrapper = Awaited<ReturnType<typeof mountSuspended<typeof MilitaryDeclensionDemoSection>>>;

let scrollIntoView: MockInstance<Element['scrollIntoView']>;

beforeEach(() => {
  scrollIntoView = vi.spyOn(Element.prototype, 'scrollIntoView').mockImplementation(() => {});
});

afterEach(() => {
  scrollIntoView.mockRestore();
});

function getResult(wrapper: Wrapper, grammaticalCase: string): string {
  return wrapper.get(`[data-grammatical-case="${grammaticalCase}"] .case-value`).text();
}

async function submitForm(wrapper: Wrapper): Promise<void> {
  const scrollCount = scrollIntoView.mock.calls.length;
  await wrapper.get('#declension-form').trigger('submit');
  await vi.waitFor(() => {
    expect(scrollIntoView.mock.calls.length).toBeGreaterThan(scrollCount);
  });
}

describe('military declension demo', () => {
  it('shows the demo military rank and appointment in every grammatical case', async () => {
    const wrapper = await mountSuspended(MilitaryDeclensionDemoSection);

    expect(getResult(wrapper, 'nominative')).toBe(
      'помічник гранатометника солдат Шевченко Тарас Григорович',
    );
    expect(getResult(wrapper, 'genitive')).toBe(
      'помічника гранатометника солдата Шевченка Тараса Григоровича',
    );
  });

  it('inflects the entered military rank and appointment', async () => {
    const wrapper = await mountSuspended(MilitaryDeclensionDemoSection);

    await wrapper.get('#gender-masculine').setValue(true);
    await wrapper.get('#military-appointment').setValue('командир відділення');
    await wrapper.get('#military-rank').setValue('сержант');
    await submitForm(wrapper);

    expect(getResult(wrapper, 'dative')).toBe('командиру відділення сержанту');
  });
});
