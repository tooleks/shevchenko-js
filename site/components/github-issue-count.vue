<script setup lang="ts">
import { computed } from 'vue';

const appConfig = useAppConfig();

type GitHubRepositoryDetails = {
  open_issues_count: number;
};

const { data, status } = await useLazyFetch<GitHubRepositoryDetails>(appConfig.content.gitHubUrl);

const issueCount = computed(() => {
  if (data.value == null) {
    return 0;
  }
  return data.value.open_issues_count;
});

const isPending = computed(() => status.value === 'pending');
</script>

<template>
  <span v-if="!isPending" class="badge bg-secondary">{{ issueCount }}</span>
</template>
