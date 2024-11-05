<script setup lang="ts">
import { computed, type PropType } from 'vue';
import { useI18n } from 'vue-i18n';
import { useCurrentLocale } from '~/composables/current-locale';
import { useAbsoluteUrl } from '~/composables/absolute-url';
import type { LocaleName } from '~/plugins/i18n';

const props = defineProps({
  locale: { type: String as PropType<LocaleName>, default: 'uk-UA' },
});

const { locale } = toRefs(props);
useCurrentLocale(locale);
const appConfig = useAppConfig();
const route = useRoute();
const { t: $t } = useI18n();
const { absoluteUrl, getAbsoluteUrl } = useAbsoluteUrl();
const pageTitle = computed(() => $t('website.title.military'));

useHead({
  title: pageTitle,
  link: [
    //
    { rel: 'canonical', href: getAbsoluteUrl(route.fullPath) },
  ],
  bodyAttrs: {
    'data-bs-theme': 'military',
  },
});

useSeoMeta({
  description: $t('website.description.military'),
  keywords: $t('website.keywords.military'),
  ogImage: getAbsoluteUrl('/preview-608x608.jpg'),
  ogImageWidth: 608,
  ogImageHeight: 608,
  ogType: 'website',
  ogUrl: absoluteUrl,
  ogSiteName: appConfig.library.name,
  ogTitle: pageTitle,
  ogDescription: $t('website.description.military'),
  twitterImage: getAbsoluteUrl('/preview-608x608.jpg'),
  twitterCard: 'summary',
  twitterTitle: pageTitle,
  twitterDescription: pageTitle,
});
</script>

<template>
  <PageHeader />
  <MilitaryBannerSection />
  <MilitaryDeclensionDemoSection />
  <MilitaryDocsSection />
  <hr />
  <PageFooter />
  <AboutModal />
  <ContactUsModal />
</template>
