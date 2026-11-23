<script setup lang="ts">
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: null },
});
</script>

<template>
  <div class="section-heading">
    <h2 class="section-title">{{ title }}</h2>
    <p v-if="subtitle" class="section-subtitle">{{ subtitle }}</p>
  </div>
</template>

<style lang="scss" scoped>
.section-heading {
  max-width: 48rem;
  margin-bottom: 2rem;
}

.section-title {
  margin: 0;
  font-size: clamp(1.75rem, 1.2rem + 2vw, 2.5rem);
  font-weight: 750;
  line-height: 1.15;
  letter-spacing: -0.03em;
  text-wrap: balance;
}

.section-subtitle {
  margin: 0.75rem 0 0;
  font-size: 1.0625rem;
  line-height: 1.6;
  color: var(--site-muted);

  &::first-letter {
    text-transform: uppercase;
  }
}
</style>
