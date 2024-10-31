<script setup lang="ts">
defineProps({
  code: { type: String, required: true },
});
</script>

<template>
  <pre v-highlight-js class="mb-0"><code>{{ code }}</code></pre>
  <CopyButton :source="code" class="ms-1" />
</template>
