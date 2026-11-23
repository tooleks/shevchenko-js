<script setup lang="ts">
import type { PropType } from 'vue';
import type { CodeTab } from '~/components/code-tabs.vue';

export type DocsStep = {
  id: string;
  title: string;
  description?: string;
  code?: string;
  tabs?: CodeTab[];
};

defineProps({
  steps: { type: Array as PropType<DocsStep[]>, required: true },
});
</script>

<template>
  <ol class="docs-steps">
    <li v-for="(step, index) in steps" :id="step.id" :key="step.id" class="docs-card">
      <CodeTabs v-if="step.tabs" :tabs="step.tabs" :label="step.title">
        <template #title>
          <h3 class="docs-card-title">
            <span class="docs-step" aria-hidden="true">{{ index + 1 }}</span>
            {{ step.title }}
          </h3>
        </template>
      </CodeTabs>

      <template v-else>
        <h3 class="docs-card-title">
          <span class="docs-step" aria-hidden="true">{{ index + 1 }}</span>
          {{ step.title }}
        </h3>
        <p v-if="step.description" class="docs-card-description">{{ step.description }}</p>
        <CodeSnippet v-if="step.code" :code="step.code" />
      </template>
    </li>
  </ol>
</template>

<style lang="scss" scoped>
.docs-steps {
  --docs-card-padding: 1.5rem;
  --docs-steps-gap: 1.5rem;

  display: grid;
  gap: var(--docs-steps-gap);
  margin: 0;
  padding: 0;
  list-style: none;

  @media (min-width: 768px) {
    --docs-card-padding: 2rem;
  }
}

.docs-card {
  position: relative;
  min-width: 0;
  padding: var(--docs-card-padding);
  border: 1px solid var(--site-line);
  border-radius: var(--site-radius-xl);
  background: #fff;
  box-shadow: var(--site-shadow-sm);

  & + &::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: calc(var(--docs-card-padding) + 0.875rem - 1px);
    width: 2px;
    height: calc(var(--docs-steps-gap) + 1px);
    background: var(--site-line-strong);
  }
}

.docs-card-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
}

.docs-card-description {
  margin: 1rem 0;
  color: var(--site-muted);
  line-height: 1.6;
}

.docs-step {
  display: grid;
  flex: none;
  place-items: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  background: var(--site-primary);
  color: #fff;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0;
}
</style>
