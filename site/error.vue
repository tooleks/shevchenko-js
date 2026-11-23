<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t: $t } = useI18n();
const pageTitle = computed(() => $t('error.404.title'));

useHead({
  title: pageTitle,
});
</script>

<template>
  <NuxtLayout>
    <section class="error-page">
      <div class="container">
        <p class="error-code" aria-hidden="true">404</p>
        <h1 class="error-title">{{ $t('error.404.message') }}</h1>

        <NuxtLink :to="{ name: 'index' }" class="btn btn-primary btn-lg">
          <i class="fa-solid fa-arrow-left me-1" aria-hidden="true"></i>
          {{ $t('action.backToHome') }}
        </NuxtLink>
      </div>
    </section>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
.error-page {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding-block: clamp(5rem, 14vw, 9rem);
  text-align: center;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background-image: radial-gradient(rgba(15, 23, 42, 0.07) 1px, transparent 1px);
    background-size: 22px 22px;
    -webkit-mask-image: radial-gradient(ellipse at 50% 40%, #000 20%, transparent 70%);
    mask-image: radial-gradient(ellipse at 50% 40%, #000 20%, transparent 70%);
  }
}

.error-code {
  display: inline-block;
  margin: 0 0 1rem;
  background: linear-gradient(
    transparent 68%,
    rgba(var(--site-yellow-rgb), 0.65) 68%,
    rgba(var(--site-yellow-rgb), 0.65) 90%,
    transparent 90%
  );
  color: var(--site-primary);
  font-size: clamp(5rem, 3rem + 10vw, 9rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.04em;
}

.error-title {
  max-width: 32rem;
  margin: 0 auto 2rem;
  font-size: clamp(1.5rem, 1.2rem + 1.2vw, 2rem);
  font-weight: 700;
  line-height: 1.25;
  text-wrap: balance;
}
</style>
