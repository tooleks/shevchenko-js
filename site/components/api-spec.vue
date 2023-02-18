<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t: $t } = useI18n();

// prettier-ignore
let apiSpec = `
shevchenko.inNominative(anthroponym: DeclensionInput): Promise<DeclensionOutput>; // ${$t('action.inflect.inNominativeCase')}
shevchenko.inGenitive(anthroponym: DeclensionInput): Promise<DeclensionOutput>;   // ${$t('action.inflect.inGenitiveCase')}
shevchenko.inDative(anthroponym: DeclensionInput): Promise<DeclensionOutput>;     // ${$t('action.inflect.inDativeCase')}
shevchenko.inAccusative(anthroponym: DeclensionInput): Promise<DeclensionOutput>; // ${$t('action.inflect.inAccusativeCase')}
shevchenko.inAblative(anthroponym: DeclensionInput): Promise<DeclensionOutput>;   // ${$t('action.inflect.inAblativeCase')}
shevchenko.inLocative(anthroponym: DeclensionInput): Promise<DeclensionOutput>;   // ${$t('action.inflect.inLocativeCase')}
shevchenko.inVocative(anthroponym: DeclensionInput): Promise<DeclensionOutput>;   // ${$t('action.inflect.inVocativeCase')}
`;
</script>

<template>
  <div id="api-spec" class="card my-3">
    <div class="card-body">
      <h5 class="card-title mb-3">API</h5>
      <pre class="mb-0">{{ apiSpec.trim() }}</pre>
    </div>
  </div>
</template>
