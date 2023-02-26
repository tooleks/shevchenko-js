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

  const appConfig = useAppConfig();
  const { t: $t } = useI18n();
  const { pageUrl } = useRouteUtils();
  const { buildPageTitle } = usePageMeta();

  const pageTitle = computed(() => {
    const title = $t('site.title').toString();
    return buildPageTitle(title);
  });

  const { buildPageUrl } = useRouteUtils();
  useHead({
    title: pageTitle,
    link: [
      //
      { rel: 'canonical', href: buildPageUrl('/en-US') },
    ],
    meta: [
      { name: 'description', content: $t('site.description') },
      { name: 'keywords', content: $t('site.keywords') },
      { property: 'og:image', content: buildPageUrl('/preview-608x608.jpg') },
      { property: 'og:image:width', content: '608' },
      { property: 'og:image:height', content: '608' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: pageUrl },
      { property: 'og:site_name', content: appConfig.library.name },
      { property: 'og:title', content: pageTitle },
      { property: 'og:description', content: $t('site.description') },
      { name: 'twitter:image', content: buildPageUrl('/preview-608x608.jpg') },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: pageTitle },
      { name: 'twitter:description', content: pageTitle },
    ],
  });

  return setupResult;
}

export default { ...IndexPage, setup };
</script>
