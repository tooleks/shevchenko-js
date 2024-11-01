<script setup lang="ts">
import { computed, type PropType } from 'vue';
import { useI18n } from 'vue-i18n';
import { usePageI18n } from '~/composables/page-i18n';
import { buildPageUrl, useRouteUtils } from '~/composables/route-utils';
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
const pageTitle = computed(() => $t('website.title.military'));

useHead({
  title: pageTitle,
  link: [
    //
    { rel: 'canonical', href: buildPageUrl(route.fullPath) },
  ],
  bodyAttrs: {
    'data-bs-theme': 'military',
  },
});

useSeoMeta({
  description: $t('website.description.military'),
  keywords: $t('website.keywords.military'),
  ogImage: buildPageUrl('/preview-608x608.jpg'),
  ogImageWidth: 608,
  ogImageHeight: 608,
  ogType: 'website',
  ogUrl: pageUrl,
  ogSiteName: appConfig.library.name,
  ogTitle: pageTitle,
  ogDescription: $t('website.description.military'),
  twitterImage: buildPageUrl('/preview-608x608.jpg'),
  twitterCard: 'summary',
  twitterTitle: pageTitle,
  twitterDescription: pageTitle,
});
</script>

<template>
  <MilitaryBannerSection />
  <MilitaryDeclensionDemoSection />
  <MilitaryDocsSection />
</template>
