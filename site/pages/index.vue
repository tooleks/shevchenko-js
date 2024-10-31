<script setup lang="ts">
import { computed } from 'vue';
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
  const title = $t('website.title').toString();
  return buildPageTitle(title);
});

useHead({
  title: pageTitle,
  link: [
    //
    { rel: 'canonical', href: buildPageUrl(route.fullPath) },
  ],
});

useSeoMeta({
  description: $t('website.description'),
  keywords: $t('website.keywords'),
  ogImage: buildPageUrl('/preview-608x608.jpg'),
  ogImageWidth: 608,
  ogImageHeight: 608,
  ogType: 'website',
  ogUrl: pageUrl,
  ogSiteName: appConfig.library.name,
  ogTitle: pageTitle,
  ogDescription: $t('website.description'),
  twitterImage: buildPageUrl('/preview-608x608.jpg'),
  twitterCard: 'summary',
  twitterTitle: pageTitle,
  twitterDescription: pageTitle,
});
</script>

<template>
  <PageHeader />
  <BannerSection />
  <DeclensionDemoSection />
  <HowItWorksSection />
  <DocsSection />
  <PageFooter />
  <AboutModal />
  <ContactUsModal />
</template>
