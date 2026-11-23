import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import CodeTabs from '~/components/code-tabs.vue';

const props = {
  label: 'Import',
  tabs: [
    { id: 'commonjs', label: 'CommonJS', description: 'With require.', code: 'require()' },
    { id: 'es-modules', label: 'ES Modules', description: 'With import.', code: 'import' },
  ],
};

describe('code tabs', () => {
  it('groups the tab buttons under the given label', async () => {
    const wrapper = await mountSuspended(CodeTabs, { props });

    const group = wrapper.get('[role="group"]');
    expect(group.attributes('aria-label')).toBe('Import');
    expect(wrapper.find('[role="tab"]').exists()).toBe(false);
  });

  it('switches the shown code and marks the pressed button', async () => {
    const wrapper = await mountSuspended(CodeTabs, { props, attachTo: document.body });
    const [commonJsButton, esModulesButton] = wrapper.findAll('button.segmented-option');
    const descriptions = wrapper.findAll('.code-tabs-description');

    expect(commonJsButton.attributes('aria-pressed')).toBe('true');
    expect(esModulesButton.attributes('aria-pressed')).toBe('false');
    expect(descriptions[0].isVisible()).toBe(true);
    expect(descriptions[1].isVisible()).toBe(false);

    await esModulesButton.trigger('click');

    expect(commonJsButton.attributes('aria-pressed')).toBe('false');
    expect(esModulesButton.attributes('aria-pressed')).toBe('true');
    expect(descriptions[0].isVisible()).toBe(false);
    expect(descriptions[1].isVisible()).toBe(true);
    wrapper.unmount();
  });
});
