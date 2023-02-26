<script setup lang="ts">
import { computed } from 'vue';
import Showdown from 'showdown';

const appConfig = useAppConfig();
const converter = new Showdown.Converter();

const { data } = await useFetch<string>(appConfig.library.howItWorksUrl, {
  headers: {
    // See https://github.com/orgs/community/discussions/46758#discussioncomment-4950782
    'Accept-Encoding': 'deflate',
  },
});

const contents = computed(() => {
  if (data.value == null) {
    return '';
  }

  return converter.makeHtml(data.value);
});
</script>

<template>
  <section v-if="$i18n.locale === 'uk-UA'" id="how-it-works" class="my-4">
    <div class="row">
      <div class="col">
        <h2>{{ $t('howItWorks') }}</h2>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <div v-html="contents" class="mt-3"></div>
      </div>
    </div>
  </section>
</template>
