<script setup lang="ts">
import { computed, toRefs } from 'vue';

const props = defineProps({
  base: { type: String, default: '' },
  text: { type: String, required: true },
});

const { base, text } = toRefs(props);

const SEPARATOR_PATTERN = /([\s-]+)/;

type Token = { stem: string; ending: string };

function getCommonPrefixLength(first: string, second: string): number {
  let length = 0;
  while (
    length < first.length &&
    length < second.length &&
    first[length].toLowerCase() === second[length].toLowerCase()
  ) {
    length++;
  }
  return length;
}

const tokens = computed<Token[]>(() => {
  const segments = text.value.split(SEPARATOR_PATTERN);
  if (!base.value) {
    return segments.map((segment) => ({ stem: segment, ending: '' }));
  }

  const baseSegments = base.value.split(SEPARATOR_PATTERN);
  return segments.map((segment, index) => {
    const baseSegment = baseSegments[index];
    const isSeparator = index % 2 === 1;
    if (isSeparator || baseSegment == null) {
      return { stem: segment, ending: '' };
    }

    const stemLength = getCommonPrefixLength(segment, baseSegment);
    return { stem: segment.slice(0, stemLength), ending: segment.slice(stemLength) };
  });
});
</script>

<template>
  <span class="declined-text"
    ><span v-for="(token, index) in tokens" :key="index"
      >{{ token.stem }}<mark v-if="token.ending">{{ token.ending }}</mark></span
    ></span
  >
</template>

<style lang="scss" scoped>
mark {
  padding: 0;
  background: none;
  color: inherit;
}
</style>
