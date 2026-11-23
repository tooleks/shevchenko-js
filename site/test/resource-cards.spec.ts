import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import ResourceCards from '~/components/resource-cards.vue';

const resources = [
  {
    id: 'external',
    icon: 'fa-brands fa-github',
    title: 'GitHub',
    text: 'Source code.',
    to: 'https://github.com',
    isExternal: true,
  },
  {
    id: 'internal',
    icon: 'fa-solid fa-signature',
    title: 'Library',
    text: 'Main page.',
    to: '/',
    isExternal: false,
  },
];

describe('resource cards', () => {
  it('tells screen reader users that an external resource opens in a new tab', async () => {
    const wrapper = await mountSuspended(ResourceCards, { props: { resources } });
    const [external, internal] = wrapper.findAll('.resource');

    expect(external.attributes('target')).toBe('_blank');
    expect(external.get('.visually-hidden').text()).toBe('(відкривається в новій вкладці)');
    expect(internal.attributes('target')).toBeUndefined();
    expect(internal.find('.visually-hidden').exists()).toBe(false);
  });
});
