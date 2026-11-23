<script setup lang="ts">
import { type PropType, toRefs, computed } from 'vue';
import * as shevchenko from 'shevchenko';

const props = defineProps({
  anthroponym: { type: Object as PropType<shevchenko.DeclensionInput>, required: true },
});

defineEmits(['patronymic-name-correction']);

const { anthroponym } = toRefs(props);

const patronymicNameSpelling = new Map([
  ['Ігорович', 'Ігорьович'],
  ['Лазарович', 'Лазарьович'],
]);

const correctPatronymicNameSpelling = computed(() => {
  const { patronymicName } = anthroponym.value;
  if (!patronymicName) {
    return patronymicName;
  }

  for (const [incorrectSpelling, correctSpelling] of Array.from(patronymicNameSpelling.entries())) {
    if (new RegExp(`^${incorrectSpelling}$`, 'i').test(patronymicName)) {
      return correctSpelling;
    }
  }

  return patronymicName;
});
</script>

<template>
  <small
    v-if="anthroponym.patronymicName !== correctPatronymicNameSpelling"
    class="d-block form-text text-muted"
  >
    {{
      $t('declension.correctionMessage', {
        incorrectSpelling: anthroponym.patronymicName,
        correctSpelling: correctPatronymicNameSpelling,
      })
    }}
    <button
      class="btn btn-link btn-anchor"
      type="button"
      @click="$emit('patronymic-name-correction', correctPatronymicNameSpelling)"
    >
      {{ $t('declension.confirmCorrection') }}
    </button>
  </small>
</template>

<style lang="scss" scoped>
.btn-anchor {
  padding: 0;
  border: 0;
  vertical-align: baseline;
  font-size: 1em;
}
</style>
