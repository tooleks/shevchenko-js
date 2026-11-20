<script setup lang="ts">
import { computed } from 'vue';

const appConfig = useAppConfig();

type GitHubIssueSearchResult = {
  total_count: number;
};

const { data, status } = await useLazyFetch<GitHubIssueSearchResult>(
  appConfig.content.gitHubIssueSearchUrl,
  {
    query: { q: `repo:${appConfig.content.gitHubRepository} type:issue state:open`, per_page: 1 },
    server: false,
  },
);

const issueCount = computed(() => {
  if (data.value == null) {
    return 0;
  }
  return data.value.total_count;
});

const isLoaded = computed(() => status.value === 'success');
</script>

<template>
  <span v-if="isLoaded" class="badge bg-secondary">{{ issueCount }}</span>
</template>
