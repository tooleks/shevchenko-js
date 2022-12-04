<script>
import IndexPage from '~/pages/index.vue';
import { usePageI18n } from '~/composables/page-i18n';
import { useRouteUtils } from '~/composables/route-utils';

function setup(...args) {
  const setupResult = IndexPage.setup.call(this, ...args);

  definePageMeta({
    alias: ['/en', '/en.html'],
  });

  usePageI18n({
    locale: 'en-US',
  });

  const { buildPageUrl } = useRouteUtils();
  useHead({
    link: [{ rel: 'canonical', href: buildPageUrl('/en-US') }],
  });

  return setupResult;
}

export default { ...IndexPage, setup };
</script>
