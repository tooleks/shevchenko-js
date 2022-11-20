<script setup lang="ts">
import { useClipboard } from '@vueuse/core';
import { computed, toRefs } from 'vue';

const props = defineProps({
  source: { type: String, required: true },
  trim: { type: Boolean, default: true },
  buttonId: { type: String, required: false },
  buttonClass: { type: String, default: 'btn btn-btn btn-link py-0 px-1' },
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
    type="button"
    :title="$t('action.copy')"
    :aria-label="$t('action.copy')"
    @click="copy()"
    :id="buttonId"
    :class="buttonClass"
  >
    <i v-if="copied" class="fa fa-check" aria-hidden="true"></i>
    <i v-else class="fa fa-clipboard" aria-hidden="true"></i>
  </button>
</template>
