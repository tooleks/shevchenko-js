<script setup lang="ts">
import { useClipboard } from '@vueuse/core';
import { computed, toRefs } from 'vue';

const props = defineProps({
  source: { type: String, required: true },
  trim: { type: Boolean, default: true },
  buttonId: { type: String, default: null },
  buttonClass: { type: String, default: 'btn btn-btn btn-link py-0 px-1' },
  buttonTitle: { type: String, default: null },
  iconClass: { type: String, default: 'fa fa-clipboard' },
});

const { source, trim } = toRefs(props);

const modifiedSource = computed(() => {
  return trim.value ? source.value.trim() : source.value;
});

const { copy, copied } = useClipboard({
  source: modifiedSource,
  legacy: true,
});
</script>

<template>
  <button
    :id="buttonId"
    type="button"
    :title="buttonTitle ?? $t('action.copy')"
    :aria-label="$t('action.copy')"
    :class="buttonClass"
    @click="copy()"
  >
    <i v-if="copied" aria-hidden="true" class="fa fa-check"></i>
    <i v-else aria-hidden="true" :class="iconClass"></i>
  </button>
</template>
