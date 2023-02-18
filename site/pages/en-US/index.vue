<script>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import IndexPage from '~/pages/index.vue';
import { usePageI18n } from '~/composables/page-i18n';
import { useRouteUtils } from '~/composables/route-utils';
import { usePageMeta } from '~/composables/page-meta';

function setup(...args) {
  const setupResult = IndexPage.setup.call(this, ...args);

  definePageMeta({
    alias: ['/en', '/en.html'],
  });

  usePageI18n({
    locale: 'en-US',
  });

  const { t: $t } = useI18n();
  const { buildPageTitle } = usePageMeta();

  const pageTitle = computed(() => {
    const title = $t('app.name').toString();
    return buildPageTitle(title);
  });

  const { buildPageUrl } = useRouteUtils();
  useHead({
    title: pageTitle,
    link: [
      //
      { rel: 'canonical', href: buildPageUrl('/en-US') },
    ],
  });

  return setupResult;
}

export default { ...IndexPage, setup };
</script>
