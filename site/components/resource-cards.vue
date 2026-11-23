<script setup lang="ts">
import type { PropType } from 'vue';
import type { RouteLocationRaw } from 'vue-router';

export type Resource = {
  id: string;
  icon: string;
  title: string;
  text: string;
  to: RouteLocationRaw;
  isExternal: boolean;
  badge?: string;
};

defineProps({
  resources: { type: Array as PropType<Resource[]>, required: true },
});
</script>

<template>
  <ul class="row g-3 resources">
    <li v-for="resource in resources" :key="resource.id" class="col-sm-6 col-xl-3">
      <NuxtLink
        class="resource"
        :to="resource.to"
        :target="resource.isExternal ? '_blank' : undefined"
      >
        <span class="resource-icon" aria-hidden="true"><i :class="resource.icon"></i></span>
        <span class="resource-body">
          <span class="resource-title">
            {{ resource.title }}
            <span v-if="resource.badge" class="resource-badge">{{ resource.badge }}</span>
            <i
              v-if="resource.isExternal"
              class="fa-solid fa-arrow-up-right-from-square resource-external"
              aria-hidden="true"
            ></i>
            <NewTabHint v-if="resource.isExternal" />
          </span>
          <span class="resource-text">{{ resource.text }}</span>
        </span>
      </NuxtLink>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.resources {
  margin-top: 1.5rem;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
}

.resource {
  display: flex;
  gap: 0.875rem;
  height: 100%;
  padding: 1.125rem 1.25rem;
  border: 1px solid var(--site-line);
  border-radius: var(--site-radius-lg);
  background: #fff;
  color: inherit;
  text-decoration: none;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;

  &:hover,
  &:focus-visible {
    border-color: rgba(var(--site-primary-rgb), 0.35);
    box-shadow: 0 12px 28px -16px rgba(var(--site-primary-rgb), 0.5);
    color: inherit;
    transform: translateY(-2px);
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover,
    &:focus-visible {
      transform: none;
    }
  }
}

.resource-icon {
  display: grid;
  flex: none;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--site-radius);
  background: rgba(var(--site-primary-rgb), 0.08);
  color: var(--site-primary);
  font-size: 1.125rem;
}

.resource-body {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.resource-title {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.375rem;
  color: var(--site-ink);
  font-weight: 650;
}

.resource-badge {
  padding: 0.125rem 0.375rem;
  border-radius: 999px;
  background: rgba(var(--site-olive-rgb), 0.12);
  color: var(--site-olive);
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.resource-external {
  color: #94a3b8;
  font-size: 0.6875rem;
}

.resource-text {
  color: var(--site-muted);
  font-size: 0.875rem;
  line-height: 1.5;
}
</style>
