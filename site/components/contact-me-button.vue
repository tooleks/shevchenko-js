<script setup lang="ts">
defineProps({
  buttonClass: { type: String, default: null },
});
</script>

<template>
  <a href="#" data-toggle="modal" data-target="#contact-me-modal" :class="buttonClass">
    <slot />
  </a>
</template>
