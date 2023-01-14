<script setup lang="ts">
import { computed } from 'vue';

const appConfig = useAppConfig();

const { data, pending } = await useFetch(appConfig.library.gitHubStatsUrl, {
  server: false,
  lazy: true,
});

const issueCount = computed(() => {
  return data.value ? data.value.open_issues_count : 0;
});
</script>

<template>
  <span v-if="!pending" class="badge badge-info">{{ issueCount }}</span>
</template>
