<script setup lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAbsoluteUrl } from '~/composables/absolute-url';
import { DEFAULT_LOCALE, LOCALES, type LocaleName } from '~/plugins/i18n';

const appConfig = useAppConfig();
const route = useRoute();
const i18n = useI18n();
const { getAbsoluteUrl } = useAbsoluteUrl();

const localeLabels: Record<LocaleName, string> = { 'uk-UA': 'UA', 'en-US': 'EN' };

function getLocaleUrl(switchLocale: LocaleName): string {
  let fullPath = route.fullPath;

  for (const availableLocale of i18n.availableLocales) {
    const localePrefixPattern = new RegExp(`^/${availableLocale}`, 'i');
    if (localePrefixPattern.test(fullPath)) {
      fullPath = fullPath.replace(localePrefixPattern, '');
    }
  }

  if (switchLocale !== DEFAULT_LOCALE) {
    fullPath = `/${switchLocale}${fullPath}`;
  }

  return getAbsoluteUrl(fullPath);
}

function getLocaleAccessibleName(locale: LocaleName): string {
  return `${localeLabels[locale]} — ${i18n.t(`website.locale.${locale}`)}`;
}

const navbarCollapse = ref<HTMLElement>();

async function closeNavbar(): Promise<void> {
  const element = navbarCollapse.value;
  if (element?.classList.contains('show')) {
    const { Collapse } = await import('bootstrap');
    Collapse.getOrCreateInstance(element).hide();
  }
}

watch(() => route.fullPath, closeNavbar);
</script>

<template>
  <header class="site-header">
    <nav class="navbar navbar-expand-lg">
      <div class="container">
        <NuxtLink class="navbar-brand site-brand" :to="{ name: 'index' }">
          <img
            class="site-brand-logo"
            src="~/assets/img/shevchenko_pixelized_304x304.jpg"
            alt=""
            width="36"
            height="36"
          />
          <span>{{ appConfig.library.name }}<span class="site-brand-extension">.js</span></span>
        </NuxtLink>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#site-navbar"
          aria-controls="site-navbar"
          aria-expanded="false"
          :aria-label="$t('nav.toggle')"
        >
          <i class="fa-solid fa-bars" aria-hidden="true"></i>
        </button>

        <div id="site-navbar" ref="navbarCollapse" class="collapse navbar-collapse">
          <ul class="navbar-nav mx-lg-auto" @click="closeNavbar">
            <li class="nav-item">
              <NuxtLink class="nav-link" :to="{ name: 'index', hash: '#demo' }">
                {{ $t('liveDemo') }}
              </NuxtLink>
            </li>

            <li class="nav-item">
              <NuxtLink class="nav-link" :to="{ name: 'index', hash: '#how-it-works' }">
                {{ $t('home.howItWorks') }}
              </NuxtLink>
            </li>

            <li class="nav-item">
              <NuxtLink class="nav-link" :to="{ name: 'index', hash: '#documentation' }">
                {{ $t('documentation') }}
              </NuxtLink>
            </li>

            <li class="nav-item">
              <NuxtLink class="nav-link" :to="{ name: 'military' }" exact-active-class="active">
                {{ $t('forMilitary') }}
                <span class="site-nav-badge">{{ $t('beta') }}</span>
              </NuxtLink>
            </li>
          </ul>

          <div class="site-nav-actions">
            <div class="site-locale-switch" role="group" :aria-label="$t('website.language')">
              <a
                v-for="locale in LOCALES"
                :key="locale"
                class="site-locale-option"
                :class="{ active: locale === $i18n.locale }"
                :href="getLocaleUrl(locale)"
                :hreflang="locale"
                :lang="locale"
                :title="$t(`website.locale.${locale}`)"
                :aria-label="getLocaleAccessibleName(locale)"
                :aria-current="locale === $i18n.locale ? 'true' : undefined"
              >
                {{ localeLabels[locale] }}
              </a>
            </div>

            <a
              class="site-github-link"
              :href="appConfig.library.gitHubUrl"
              target="_blank"
              title="GitHub"
            >
              <i class="fa-brands fa-github" aria-hidden="true"></i>
              <span class="site-github-label">GitHub</span> <NewTabHint />
            </a>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 1030;
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
  background: rgba(255, 255, 255, 0.82);
  -webkit-backdrop-filter: saturate(180%) blur(12px);
  backdrop-filter: saturate(180%) blur(12px);
}

.navbar {
  --bs-navbar-padding-y: 0.75rem;
}

.site-brand {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  margin-right: 1.5rem;
  padding: 0;
  color: var(--site-ink);
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -0.02em;

  &:hover,
  &:focus {
    color: var(--site-ink);
  }
}

.site-brand-logo {
  width: 36px;
  height: 36px;
  border-radius: 0.625rem;
  box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.08);
  object-fit: cover;
}

.site-brand-extension {
  color: var(--site-primary);
}

.navbar-toggler {
  padding: 0.375rem 0.75rem;
  border: 1px solid var(--site-line);
  border-radius: var(--site-radius);
  color: var(--site-ink);
  font-size: 1.125rem;

  &:focus {
    box-shadow: 0 0 0 3px rgba(var(--site-primary-rgb), 0.2);
  }
}

.navbar-nav {
  gap: 0.125rem;
  padding-block: 0.75rem;

  @media (min-width: 992px) {
    padding-block: 0;
  }
}

.nav-link {
  --bs-navbar-nav-link-padding-x: 0.875rem;

  padding-inline: 0.875rem;
  border-radius: 0.5rem;
  color: var(--site-text);
  font-size: 0.9375rem;
  font-weight: 500;

  &:hover,
  &:focus-visible,
  &.active {
    background: var(--site-surface-strong);
    color: var(--site-ink);
  }
}

.site-nav-badge {
  display: inline-block;
  margin-left: 0.25rem;
  padding: 0.125rem 0.375rem;
  border-radius: 999px;
  background: rgba(var(--site-olive-rgb), 0.12);
  color: var(--site-olive);
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  vertical-align: 0.1em;
}

.site-nav-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-bottom: 1rem;

  @media (min-width: 992px) {
    padding-bottom: 0;
  }
}

.site-locale-switch {
  display: inline-flex;
  gap: 2px;
  padding: 3px;
  border-radius: 999px;
  background: var(--site-surface-strong);
}

.site-locale-option {
  padding: 0.25rem 0.625rem;
  border-radius: 999px;
  color: var(--site-muted);
  font-size: 0.8125rem;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    color: var(--site-ink);
  }

  &.active {
    background: #fff;
    color: var(--site-ink);
    box-shadow: var(--site-shadow-sm);
  }
}

.site-github-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-width: 2.25rem;
  height: 2.25rem;
  padding: 0 0.5rem;
  border-radius: var(--site-radius);
  color: var(--site-ink);
  font-size: 1.25rem;
  text-decoration: none;

  &:hover {
    background: var(--site-surface-strong);
    color: var(--site-ink);
  }
}

.site-github-label {
  font-size: 0.9375rem;
  font-weight: 500;

  @media (min-width: 992px) {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }
}
</style>
