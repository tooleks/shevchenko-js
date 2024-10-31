<script setup lang="ts">
defineProps({
  code: { type: String, required: true },
});
</script>

<template>
  <div class="position-relative">
    <pre v-highlight-js class="mb-0"><code>{{ code }}</code></pre>
    <CopyButton :source="code" class="position-absolute top-0 end-0" />
  </div>
</template>
