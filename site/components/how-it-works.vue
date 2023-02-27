<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import Showdown from 'showdown';

const appConfig = useAppConfig();
const converter = new Showdown.Converter();

const { data } = await useFetch<string>(appConfig.content.howItWorksUrl);

const contents = computed(() => {
  if (data.value == null) {
    return '';
  }

  return converter.makeHtml(data.value);
});

const { locale } = useI18n();
const isVisible = computed(() => locale.value === 'uk-UA')
</script>

<template>
  <section v-if="isVisible" id="how-it-works" class="my-4">
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
