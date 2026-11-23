<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useCurrentLocale } from '~/composables/current-locale';
import { useLocaleAlternates } from '~/composables/locale-alternates';
import { useAbsoluteUrl } from '~/composables/absolute-url';

const locale = useCurrentLocale();
const { getLocaleUrl } = useLocaleAlternates('/military/');
const appConfig = useAppConfig();
const { t: $t } = useI18n();
const { getAbsoluteUrl } = useAbsoluteUrl();
const canonicalUrl = computed(() => getLocaleUrl(locale.value));
const pageTitle = computed(() => $t('website.title.military'));
const pageDescription = computed(() => $t('website.description.military'));

useHead({
  title: pageTitle,
  link: [
    //
    { rel: 'canonical', href: canonicalUrl },
  ],
  bodyAttrs: {
    'data-theme': 'military',
  },
});

useSeoMeta({
  description: pageDescription,
  keywords: $t('website.keywords.military'),
  ogImage: getAbsoluteUrl('/preview-608x608.jpg'),
  ogImageWidth: 608,
  ogImageHeight: 608,
  ogType: 'website',
  ogUrl: canonicalUrl,
  ogSiteName: appConfig.library.displayName,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  twitterImage: getAbsoluteUrl('/preview-608x608.jpg'),
  twitterCard: 'summary',
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
});
</script>

<template>
  <MilitaryHeroSection />
  <MilitaryDeclensionDemoSection />
  <MilitaryDocsSection />
</template>
