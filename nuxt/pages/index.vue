<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { usePageI18n } from '~/composables/page-i18n';
import { useRouteUtils } from '~/composables/route-utils';

usePageI18n({
  locale: 'uk-UA',
});

const appConfig = useAppConfig();
const { t: $t } = useI18n();
const { pageUrl } = useRouteUtils();

const pageTitle = computed(() => appConfig.library.name + ' - ' + $t('app.name').toString());

useHead({
  title: pageTitle,
  meta: [
    { property: 'og:image', content: appConfig.website.meta.imageUrl },
    { property: 'og:image:width', content: appConfig.website.meta.imageWidth },
    { property: 'og:image:height', content: appConfig.website.meta.imageHeight },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: pageUrl },
    { property: 'og:site_name', content: appConfig.library.name },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageTitle },
    { name: 'twitter:image', content: appConfig.website.meta.imageUrl },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: pageTitle },
  ],
});
</script>

<template>
  <PageHeader />
  <PreviewBanner />
  <DeclensionDemo />
  <HowItWorks />
  <LibraryDocs />
  <PageFooter />
  <ContactMeModal />
</template>
