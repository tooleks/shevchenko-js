<script setup lang="ts">
import { computed, type PropType } from 'vue';
import { useI18n } from 'vue-i18n';
import { useCurrentLocale } from '~/composables/current-locale';
import { useLocaleAlternates } from '~/composables/locale-alternates';
import { useAbsoluteUrl } from '~/composables/absolute-url';
import type { LocaleName } from '~/plugins/i18n';

const props = defineProps({
  locale: { type: String as PropType<LocaleName>, default: 'uk-UA' },
});

const { locale } = toRefs(props);
useCurrentLocale(locale);
useLocaleAlternates('/military');
const appConfig = useAppConfig();
const route = useRoute();
const { t: $t } = useI18n();
const { absoluteUrl, getAbsoluteUrl } = useAbsoluteUrl();
const pageTitle = computed(() => $t('website.title.military'));
const pageDescription = computed(() => $t('website.description.military'));

useHead({
  title: pageTitle,
  link: [
    //
    { rel: 'canonical', href: getAbsoluteUrl(route.fullPath) },
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
  ogUrl: absoluteUrl,
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
