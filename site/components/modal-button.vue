<script setup lang="ts">
defineProps({
  modalId: { type: String, required: true },
});
</script>

<template>
  <a href="#" data-bs-toggle="modal" :data-bs-target="`#${modalId}`">
    <slot />
  </a>
</template>
