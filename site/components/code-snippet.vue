<script setup lang="ts">
import { computed, toRefs } from 'vue';

const props = defineProps({
  code: { type: String, required: true },
});

const { code } = toRefs(props);

const isMultiline = computed(() => code.value.includes('\n'));
</script>

<template>
  <div class="code-snippet" :class="{ 'code-snippet-multiline': isMultiline }">
    <pre v-highlight-js class="code-snippet-pre"><code>{{ code }}</code></pre>
    <CopyButton :source="code" button-class="code-snippet-copy" />
  </div>
</template>

<style lang="scss" scoped>
.code-snippet {
  position: relative;
  border: 1px solid #1e293b;
  border-radius: 0.75rem;
  background: #0f172a;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);

  :deep(.hljs) {
    padding: 0;
    background: transparent;
    color: #e2e8f0;
    line-height: inherit;
  }

  :deep(.hljs-keyword),
  :deep(.hljs-doctag),
  :deep(.hljs-template-tag),
  :deep(.hljs-type) {
    color: #ff7b72;
  }

  :deep(.hljs-title) {
    color: #d2a8ff;
  }

  :deep(.hljs-attr),
  :deep(.hljs-attribute),
  :deep(.hljs-literal),
  :deep(.hljs-meta),
  :deep(.hljs-number),
  :deep(.hljs-operator),
  :deep(.hljs-variable),
  :deep(.hljs-property) {
    color: #79c0ff;
  }

  :deep(.hljs-string),
  :deep(.hljs-regexp) {
    color: #a5d6ff;
  }

  :deep(.hljs-built_in),
  :deep(.hljs-symbol) {
    color: #ffa657;
  }

  :deep(.hljs-params),
  :deep(.hljs-subst) {
    color: #e2e8f0;
  }

  :deep(.hljs-comment),
  :deep(.hljs-quote) {
    color: #8b949e;
  }

  :deep(.hljs-name),
  :deep(.hljs-tag),
  :deep(.hljs-selector-tag) {
    color: #7ee787;
  }
}

.code-snippet-pre {
  margin: 0;
  padding: 0.875rem 3.5rem 0.875rem 1.125rem;
  overflow-x: auto;
  color: #e2e8f0;
  font-size: 0.8125rem;
  line-height: 1.7;
  scrollbar-color: #334155 transparent;

  code {
    color: inherit;
    font-family: var(--bs-font-monospace);
  }
}

.code-snippet-multiline .code-snippet-pre {
  padding: 1.25rem 3.5rem 1.25rem 1.25rem;
}

.code-snippet-copy {
  position: absolute;
  top: 50%;
  right: 0.5rem;
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  background: #0f172a;
  color: #94a3b8;
  cursor: pointer;
  transform: translateY(-50%);
  transition: color 0.15s, background-color 0.15s;

  &:hover {
    background: #1e293b;
    color: #fff;
  }

  &:focus-visible {
    outline: 2px solid #60a5fa;
    outline-offset: 2px;
  }

  :deep(.fa-check) {
    color: #4ade80;
  }
}

.code-snippet-multiline .code-snippet-copy {
  top: 0.75rem;
  transform: none;
}
</style>
