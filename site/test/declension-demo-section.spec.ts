import { mountSuspended } from '@nuxt/test-utils/runtime';
import { afterEach, beforeEach, describe, expect, it, vi, type MockInstance } from 'vitest';
import DeclensionDemoSection from '~/components/declension-demo-section.vue';
import { useAnnouncer } from '~/composables/announcer';

type Wrapper = Awaited<ReturnType<typeof mountSuspended<typeof DeclensionDemoSection>>>;

type AnthroponymFields = {
  familyName?: string;
  givenName?: string;
  patronymicName?: string;
};

const DEMO_RESULTS = {
  nominative: 'Шевченко Тарас Григорович',
  genitive: 'Шевченка Тараса Григоровича',
  dative: 'Шевченку Тарасу Григоровичу',
  accusative: 'Шевченка Тараса Григоровича',
  ablative: 'Шевченком Тарасом Григоровичем',
  locative: 'Шевченкові Тарасові Григоровичу',
  vocative: 'Шевченку Тарасе Григоровичу',
};

const LARYSA_KOSACH: AnthroponymFields = {
  familyName: 'Косач-Квітка',
  givenName: 'Лариса',
  patronymicName: 'Петрівна',
};

let scrollIntoView: MockInstance<Element['scrollIntoView']>;

beforeEach(() => {
  scrollIntoView = vi.spyOn(Element.prototype, 'scrollIntoView').mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

function getResult(wrapper: Wrapper, grammaticalCase: string): string {
  return wrapper.get(`[data-grammatical-case="${grammaticalCase}"] .case-value`).text();
}

async function fillForm(wrapper: Wrapper, fields: AnthroponymFields): Promise<void> {
  await wrapper.get('#family-name').setValue(fields.familyName ?? '');
  await wrapper.get('#given-name').setValue(fields.givenName ?? '');
  await wrapper.get('#patronymic-name').setValue(fields.patronymicName ?? '');
}

async function submitForm(wrapper: Wrapper): Promise<void> {
  const scrollCount = scrollIntoView.mock.calls.length;
  await wrapper.get('#declension-form').trigger('submit');
  await vi.waitFor(() => expect(scrollIntoView).toHaveBeenCalledTimes(scrollCount + 1));
}

function getLastScrollTarget(): unknown {
  return scrollIntoView.mock.contexts.at(-1);
}

describe('declension form', () => {
  it('inflects the entered anthroponym with the auto-detected gender', async () => {
    const wrapper = await mountSuspended(DeclensionDemoSection);

    await fillForm(wrapper, LARYSA_KOSACH);
    await submitForm(wrapper);

    expect(getResult(wrapper, 'genitive')).toBe('Косач-Квітки Лариси Петрівни');
    expect(getResult(wrapper, 'vocative')).toBe('Косач-Квітко Ларисо Петрівно');
    expect(wrapper.get('label[for="gender-auto"]').text()).toContain('Жіночий');
  });

  it('inflects the entered anthroponym with the selected gender', async () => {
    const wrapper = await mountSuspended(DeclensionDemoSection);

    await wrapper.get('#gender-feminine').setValue(true);
    await fillForm(wrapper, { familyName: 'Шевченко' });
    await submitForm(wrapper);

    expect(getResult(wrapper, 'genitive')).toBe('Шевченко');
    expect(getResult(wrapper, 'dative')).toBe('Шевченко');
  });

  it('inflects the demo anthroponym when the form is empty', async () => {
    const wrapper = await mountSuspended(DeclensionDemoSection);

    await fillForm(wrapper, LARYSA_KOSACH);
    await submitForm(wrapper);
    await fillForm(wrapper, {});
    await submitForm(wrapper);

    expect(getResult(wrapper, 'genitive')).toBe(DEMO_RESULTS.genitive);
  });

  it('stores the declension input in the query params', async () => {
    const wrapper = await mountSuspended(DeclensionDemoSection);

    await fillForm(wrapper, LARYSA_KOSACH);
    await submitForm(wrapper);

    expect(useRouter().currentRoute.value.query).toEqual({
      gender: 'feminine',
      ...LARYSA_KOSACH,
    });
  });

  it('autofills the form from the query params and scrolls to the results', async () => {
    const query = new URLSearchParams({ gender: 'feminine', ...LARYSA_KOSACH });
    const wrapper = await mountSuspended(DeclensionDemoSection, { route: `/?${query}` });

    await vi.waitFor(() => expect(scrollIntoView).toHaveBeenCalledTimes(1));
    expect(getResult(wrapper, 'genitive')).toBe('Косач-Квітки Лариси Петрівни');
    expect((wrapper.get('#family-name').element as HTMLInputElement).value).toBe('Косач-Квітка');
    expect((wrapper.get('#gender-feminine').element as HTMLInputElement).checked).toBe(true);
    expect(getLastScrollTarget()).toBe(wrapper.get('#declension-results').element);
  });

  it('shows an error when the gender cannot be detected', async () => {
    const wrapper = await mountSuspended(DeclensionDemoSection);

    await fillForm(wrapper, { familyName: 'Шевченко' });
    await submitForm(wrapper);

    expect(wrapper.find('#gender-detection-error').exists()).toBe(true);
    expect(getResult(wrapper, 'genitive')).toBe(DEMO_RESULTS.genitive);
  });

  it('describes the gender options with the hint or the error', async () => {
    const wrapper = await mountSuspended(DeclensionDemoSection);
    const getDescriptionId = () => wrapper.get('#gender-masculine').attributes('aria-describedby');

    expect(getDescriptionId()).toBe('gender-auto-detection-hint');
    expect(wrapper.find('#gender-auto-detection-hint').exists()).toBe(true);

    await fillForm(wrapper, { familyName: 'Шевченко' });
    await submitForm(wrapper);

    expect(getDescriptionId()).toBe('gender-detection-error');
  });

  it('hides the gender detection error after a successful declension', async () => {
    const wrapper = await mountSuspended(DeclensionDemoSection);

    await fillForm(wrapper, { familyName: 'Шевченко' });
    await submitForm(wrapper);
    await wrapper.get('#gender-masculine').setValue(true);
    await submitForm(wrapper);

    expect(wrapper.find('#gender-detection-error').exists()).toBe(false);
    expect(getResult(wrapper, 'genitive')).toBe('Шевченка');
  });

  it('applies the suggested patronymic name spelling', async () => {
    const wrapper = await mountSuspended(DeclensionDemoSection);

    await fillForm(wrapper, {
      familyName: 'Петренко',
      givenName: 'Олег',
      patronymicName: 'Ігорович',
    });
    const scrollCount = scrollIntoView.mock.calls.length;
    await wrapper.get('.btn-anchor').trigger('click');
    await vi.waitFor(() => expect(scrollIntoView).toHaveBeenCalledTimes(scrollCount + 1));

    expect((wrapper.get('#patronymic-name').element as HTMLInputElement).value).toBe('Ігорьович');
    expect(getResult(wrapper, 'genitive')).toBe('Петренка Олега Ігорьовича');
  });

  it('scrolls to the results after a successful declension', async () => {
    const wrapper = await mountSuspended(DeclensionDemoSection);

    await fillForm(wrapper, LARYSA_KOSACH);
    await submitForm(wrapper);

    expect(getLastScrollTarget()).toBe(wrapper.get('#declension-results').element);
    expect(scrollIntoView).toHaveBeenLastCalledWith({ behavior: 'smooth', block: 'start' });
  });

  it('scrolls to the error when the gender cannot be detected', async () => {
    const wrapper = await mountSuspended(DeclensionDemoSection);

    await fillForm(wrapper, { familyName: 'Шевченко' });
    await submitForm(wrapper);

    expect(getLastScrollTarget()).toBe(wrapper.get('#gender-detection-error').element);
    expect(scrollIntoView).toHaveBeenLastCalledWith({ behavior: 'smooth', block: 'center' });
  });

  it('moves the focus to the results after a successful declension', async () => {
    const wrapper = await mountSuspended(DeclensionDemoSection, { attachTo: document.body });

    await fillForm(wrapper, LARYSA_KOSACH);
    await submitForm(wrapper);

    expect(document.activeElement).toBe(wrapper.get('.demo-results-title').element);
    wrapper.unmount();
  });

  it('keeps the focus when the form is autofilled from the query params', async () => {
    const query = new URLSearchParams({ gender: 'feminine', ...LARYSA_KOSACH });
    const wrapper = await mountSuspended(DeclensionDemoSection, {
      route: `/?${query}`,
      attachTo: document.body,
    });

    await vi.waitFor(() => expect(scrollIntoView).toHaveBeenCalledTimes(1));
    expect(document.activeElement).not.toBe(wrapper.get('.demo-results-title').element);
    wrapper.unmount();
  });
});

describe('declension results', () => {
  it('shows the demo anthroponym in every grammatical case', async () => {
    const wrapper = await mountSuspended(DeclensionDemoSection);

    for (const [grammaticalCase, result] of Object.entries(DEMO_RESULTS)) {
      expect(getResult(wrapper, grammaticalCase)).toBe(result);
    }
  });

  it('copies the declension result in the selected grammatical case', async () => {
    const wrapper = await mountSuspended(DeclensionDemoSection);

    await wrapper.get('#copy-genitive-case-button').trigger('click');

    await vi.waitFor(async () => {
      expect(await navigator.clipboard.readText()).toBe(DEMO_RESULTS.genitive);
    });
  });

  it('announces that the declension result was copied', async () => {
    const wrapper = await mountSuspended(DeclensionDemoSection);
    const { message } = useAnnouncer();

    await wrapper.get('#copy-genitive-case-button').trigger('click');

    await vi.waitFor(() => expect(message.value).toBe('Скопійовано'));
  });
});
