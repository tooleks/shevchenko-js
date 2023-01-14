<script setup lang="ts">
import { computed } from 'vue';
import { useNow } from '@vueuse/core';

const appConfig = useAppConfig();
const currentTime = useNow();
const currentYear = computed(() => currentTime.value.getFullYear());
</script>

<template>
  <span>
    &copy; {{ appConfig.library.releaseYear }}-{{ currentYear }}
    {{ appConfig.library.name }}
  </span>
</template>
