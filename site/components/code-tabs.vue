<script setup lang="ts">
import { ref, type PropType } from 'vue';

export type CodeTab = {
  id: string;
  label: string;
  description: string;
  code: string;
};

const props = defineProps({
  tabs: { type: Array as PropType<CodeTab[]>, required: true },
  label: { type: String, required: true },
});

const activeTabId = ref(props.tabs[0]?.id);
</script>

<template>
  <div class="code-tabs">
    <div class="code-tabs-header">
      <slot name="title" />

      <div class="segmented segmented-inline" role="group" :aria-label="label">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          type="button"
          class="segmented-option"
          :aria-pressed="tab.id === activeTabId"
          @click="activeTabId = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <div v-for="tab in tabs" v-show="tab.id === activeTabId" :key="tab.id">
      <p class="code-tabs-description">{{ tab.description }}</p>
      <CodeSnippet :code="tab.code" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.code-tabs-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.code-tabs-description {
  margin: 0 0 1rem;
  color: var(--site-muted);
  line-height: 1.6;
}
</style>
