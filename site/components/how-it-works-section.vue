<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import Showdown from 'showdown';

const converter = new Showdown.Converter();

const appConfig = useAppConfig();
const { locale } = useI18n();
const isVisible = computed(() => locale.value === 'uk-UA');

const { data } = await useFetch<string>(appConfig.content.howItWorksUrl);

const contents = computed(() => {
  if (data.value == null) {
    return '';
  }
  return converter.makeHtml(data.value);
});
</script>

<template>
  <section v-if="isVisible" id="how-it-works" class="my-4">
    <div class="row">
      <div class="col">
        <h2>{{ $t('documentation.howItWorks') }}</h2>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <div class="card mt-3">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="card-body" v-html="contents"></div>
        </div>
      </div>
    </div>
  </section>
</template>
