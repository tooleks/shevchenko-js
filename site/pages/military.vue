<script setup lang="ts">
import { computed, type PropType } from 'vue';
import { useI18n } from 'vue-i18n';
import { usePageI18n } from '~/composables/page-i18n';
import { buildPageUrl, useRouteUtils } from '~/composables/route-utils';
import { usePageMeta } from '~/composables/page-meta';
import type { LocaleName } from '~/plugins/i18n';

const props = defineProps({
  locale: { type: String as PropType<LocaleName>, default: 'uk-UA' },
});

const { locale } = toRefs(props);
usePageI18n({ locale: locale.value });
const appConfig = useAppConfig();
const route = useRoute();
const { t: $t } = useI18n();
const { pageUrl } = useRouteUtils();
const { buildPageTitle } = usePageMeta();

const pageTitle = computed(() => {
  const title = $t('website.title.military').toString();
  return buildPageTitle(title);
});

useHead({
  title: pageTitle,
  link: [
    //
    { rel: 'canonical', href: buildPageUrl(route.href) },
  ],
  meta: [
    { name: 'description', content: $t('website.description.military') },
    { name: 'keywords', content: $t('website.keywords.military') },
    { property: 'og:image', content: buildPageUrl('/preview-608x608.jpg') },
    { property: 'og:image:width', content: '608' },
    { property: 'og:image:height', content: '608' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: pageUrl },
    { property: 'og:site_name', content: appConfig.library.name },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: $t('website.description.military') },
    { name: 'twitter:image', content: buildPageUrl('/preview-608x608.jpg') },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: pageTitle },
    { name: 'twitter:description', content: pageTitle },
  ],
  bodyAttrs: {
    'data-bs-theme': 'military',
  },
});
</script>

<template>
  <PageHeader />
  <MilitaryBannerSection />
  <MilitaryDeclensionDemoSection />
  <MilitaryDocsSection />
  <PageFooter />
  <AboutModal />
  <ContactUsModal />
</template>
