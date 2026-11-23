<script setup lang="ts">
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
const { getLocaleUrl } = useLocaleAlternates('/');
const appConfig = useAppConfig();
const { t: $t } = useI18n();
const { getAbsoluteUrl } = useAbsoluteUrl();
const canonicalUrl = computed(() => getLocaleUrl(locale.value));
const pageTitle = computed(() => $t('website.title'));
const pageDescription = computed(() => $t('website.description'));

useHead({
  title: pageTitle,
  link: [
    //
    { rel: 'canonical', href: canonicalUrl },
  ],
});

useSeoMeta({
  description: pageDescription,
  keywords: $t('website.keywords'),
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
  <HeroSection />
  <DeclensionDemoSection />
  <HowItWorksSection />
  <DocsSection />
</template>
