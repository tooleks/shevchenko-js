<script setup lang="ts">
import { computed } from 'vue';

const appConfig = useAppConfig();

interface GitHubRepositoryDetails {
  open_issues_count: number;
}

const { data, pending } = await useLazyFetch<GitHubRepositoryDetails>(appConfig.content.gitHubUrl);

const issueCount = computed(() => {
  if (data.value == null) {
    return 0;
  }
  return data.value.open_issues_count;
});
</script>

<template>
  <span v-if="!pending" class="badge bg-secondary">{{ issueCount }}</span>
</template>
