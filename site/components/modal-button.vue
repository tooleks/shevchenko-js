<script setup lang="ts">
defineProps({
  modalId: { type: String, required: true },
});
</script>

<template>
  <a href="#" data-toggle="modal" :data-target="`#${modalId}`">
    <slot />
  </a>
</template>
