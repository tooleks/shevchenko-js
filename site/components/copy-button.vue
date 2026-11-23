<script setup lang="ts">
import { useClipboard } from '@vueuse/core';
import { computed, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAnnouncer } from '~/composables/announcer';

const props = defineProps({
  source: { type: String, required: true },
  trim: { type: Boolean, default: true },
  buttonId: { type: String, default: null },
  buttonClass: { type: String, default: 'btn btn-btn btn-link py-0 px-1' },
  buttonTitle: { type: String, default: null },
});

const { source, trim } = toRefs(props);

const modifiedSource = computed(() => {
  return trim.value ? source.value.trim() : source.value;
});

const { copy, copied } = useClipboard({
  source: modifiedSource,
  legacy: true,
});

const { t: $t } = useI18n();
const { announce } = useAnnouncer();

async function handleClick(): Promise<void> {
  await copy();
  if (copied.value) {
    await announce($t('action.copied'));
  }
}
</script>

<template>
  <button
    :id="buttonId"
    type="button"
    :title="buttonTitle ?? $t('action.copy')"
    :aria-label="$t('action.copy')"
    :class="buttonClass"
    @click="handleClick"
  >
    <i v-if="copied" aria-hidden="true" class="fa-solid fa-check"></i>
    <i v-else aria-hidden="true" class="fa-solid fa-copy"></i>
  </button>
</template>
