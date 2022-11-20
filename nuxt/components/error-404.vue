<template>
  <div class="jumbotron my-3">
    <h1 class="text-truncate">
      {{ $t('error404.pageTitle') }}
    </h1>

    <p>
      {{ $t('error404.instructionMessage') }}
    </p>

    <NuxtLink :to="{ name: 'index' }" class="btn btn-primary">
      {{ $t('action.backToHome') }}
    </NuxtLink>
  </div>
</template>
