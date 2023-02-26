<script setup lang="ts">
import { computed,  onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { usePageI18n } from '~/composables/page-i18n';
import { buildPageUrl, useRouteUtils } from '~/composables/route-utils';
import { usePageMeta } from '~/composables/page-meta';
import { DeclensionInput } from 'shevchenko';

usePageI18n({
  locale: 'uk-UA',
});

const appConfig = useAppConfig();
const { t: $t } = useI18n();
const route = useRoute();
const { pageUrl } = useRouteUtils();
const router = useRouter();
const { buildPageTitle } = usePageMeta();

const pageTitle = computed(() => {
  const title = $t('site.title').toString();
  return buildPageTitle(title);
});

useHead({
  title: pageTitle,
  link: [
    //
    { rel: 'canonical', href: buildPageUrl('/') },
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

async function storeDeclensionInput(input: Partial<DeclensionInput>): Promise<void> {
  // For some reason, the route query is not updated when all query keys remain the same.
  // The next line of code forcibly resets the route query to fix the bug.
  await router.replace({ query: {} });
  await router.replace({ query: { ...input } });
}

onMounted(() => storeDeclensionInput(route.query));
</script>

<template>
  <PageHeader />
  <PreviewBanner />
  <DeclensionDemo :initial-anthroponym="$route.query" @declension="storeDeclensionInput" />
  <HowItWorks />
  <LibraryDocs />
  <PageFooter />
  <ContactMeModal />
  <AboutModal />
</template>
