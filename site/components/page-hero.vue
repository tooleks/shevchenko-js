<script setup lang="ts">
defineProps({
  titleAccent: { type: String, required: true },
  lead: { type: String, required: true },
  installCommand: { type: String, required: true },
  badge: { type: String, default: null },
});
</script>

<template>
  <section class="hero">
    <div class="container">
      <div class="row align-items-center gy-5 gx-lg-5">
        <div class="col-lg-7">
          <i18n-t keypath="hero.title" tag="h1" class="hero-title">
            <template #accent>
              <span class="hero-title-accent">{{ titleAccent }}</span>
            </template>
          </i18n-t>

          <p class="hero-lead">{{ lead }}</p>

          <div class="hero-actions">
            <NuxtLink class="btn btn-primary btn-lg" :to="{ hash: '#demo' }">
              {{ $t('action.tryItOut') }}
              <i class="fa-solid fa-arrow-down ms-1" aria-hidden="true"></i>
            </NuxtLink>

            <NuxtLink class="btn btn-soft btn-lg" :to="{ hash: '#documentation' }">
              {{ $t('documentation') }}
            </NuxtLink>
          </div>

          <div class="hero-meta">
            <div class="hero-install">
              <span class="hero-install-prompt" aria-hidden="true">$</span>
              <code>{{ installCommand }}</code>
              <CopyButton :source="installCommand" button-class="hero-install-copy" />
            </div>

            <span v-if="badge" class="hero-badge">{{ badge }}</span>

            <slot name="meta" />
          </div>
        </div>

        <div class="col-lg-5">
          <slot name="aside" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding-block: clamp(2rem, 4vw, 3.75rem);

  &::before,
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
  }

  &::before {
    background: radial-gradient(
        48rem 26rem at 100% 0%,
        rgba(var(--site-yellow-rgb), 0.22),
        transparent 70%
      ),
      radial-gradient(40rem 28rem at 0% 0%, rgba(var(--site-blue-rgb), 0.12), transparent 70%);
  }

  &::after {
    background-image: radial-gradient(rgba(15, 23, 42, 0.07) 1px, transparent 1px);
    background-size: 22px 22px;
    -webkit-mask-image: radial-gradient(ellipse at 50% 0%, #000 30%, transparent 75%);
    mask-image: radial-gradient(ellipse at 50% 0%, #000 30%, transparent 75%);
  }
}

.hero-title {
  margin: 0 0 1.25rem;
  font-size: clamp(2.25rem, 1.3rem + 3.8vw, 4rem);
  font-weight: 800;
  line-height: 1.06;
  letter-spacing: -0.035em;
  text-wrap: balance;
}

.hero-title-accent {
  background: linear-gradient(
    transparent 68%,
    rgba(var(--site-yellow-rgb), 0.65) 68%,
    rgba(var(--site-yellow-rgb), 0.65) 92%,
    transparent 92%
  );
  color: var(--site-primary);
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
}

.hero-lead {
  max-width: 38rem;
  margin-bottom: 2rem;
  color: var(--site-text);
  font-size: clamp(1.0625rem, 1rem + 0.3vw, 1.1875rem);
  line-height: 1.65;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.hero-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1.25rem;
  margin-top: 2rem;
}

.hero-install {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  max-width: 100%;
  padding: 0.3125rem 0.3125rem 0.3125rem 0.875rem;
  border: 1px solid var(--site-line);
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.75);
  box-shadow: var(--site-shadow-sm);
  color: var(--site-ink);
  font-family: var(--bs-font-monospace);
  font-size: 0.875rem;

  @media (max-width: 575.98px) {
    flex: 1 1 100%;
  }

  code {
    flex: 1 1 auto;
    min-width: 0;
    overflow-x: auto;
    color: inherit;
    font-size: inherit;
    white-space: nowrap;
    scrollbar-width: none;
  }
}

.hero-install-prompt {
  color: var(--site-muted);
  user-select: none;
}

.hero-install-copy {
  display: grid;
  flex: none;
  place-items: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: 0;
  border-radius: 0.5rem;
  background: transparent;
  color: var(--site-muted);
  cursor: pointer;
  transition: color 0.15s, background-color 0.15s;

  &:hover {
    background: var(--site-surface-strong);
    color: var(--site-ink);
  }

  &:focus-visible {
    outline: 2px solid var(--site-primary);
    outline-offset: 1px;
  }

  :deep(.fa-check) {
    color: #16a34a;
  }
}

.hero-badge {
  padding: 0.25rem 0.625rem;
  border-radius: 999px;
  background: var(--site-olive);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

:slotted(.hero-meta-item) {
  color: var(--site-muted);
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
}

:slotted(.hero-meta-item i) {
  margin-right: 0.25rem;
}

:slotted(a.hero-meta-item:hover) {
  color: var(--site-ink);
}
</style>
