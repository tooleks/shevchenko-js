<template>
  <div class="jumbotron my-3">
    <h1 class="text-truncate">
      {{ $t('error.404.title') }}
    </h1>

    <p>
      {{ $t('error.404.message') }}
    </p>

    <NuxtLink :to="{ name: 'index' }" class="btn btn-primary">
      {{ $t('action.backToHome') }}
    </NuxtLink>
  </div>
</template>
