<script setup lang="ts">
import { countryCodeEmoji } from 'country-code-emoji';
import { buildPageUrl } from '~/composables/route-utils';

const appConfig = useAppConfig();

function getLocaleEmoji(locale: string): string {
  return countryCodeEmoji(locale.split('-')[1]);
}
</script>

<template>
  <nav class="navbar navbar-expand-xl navbar-light bg-light">
    <div class="container-fluid">
      <NuxtLink class="navbar-brand" :to="{ name: 'index' }">
        <img
          class="navbar-logo"
          src="~/assets/img/shevchenko_pixelized_304x304.jpg"
          :alt="appConfig.library.displayName"
        />
        <span>{{ appConfig.library.displayName }}</span>
      </NuxtLink>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbar-supported-content"
        aria-controls="navbar-supported-content"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="navbar-supported-content" class="collapse navbar-collapse">
        <ul class="navbar-nav mt-2 mt-lg-0 ms-auto" role="menubar">
          <li class="nav-item" role="presentation">
            <NuxtLink
              class="nav-link"
              :to="{ name: 'military' }"
              exact-active-class="active"
              role="menuitem"
            >
              {{ $t('forMilitary') }} <span class="badge bg-military">{{ $t('new') }}</span>
            </NuxtLink>
          </li>

          <li class="nav-item" role="presentation">
            <NuxtLink class="nav-link" :to="{ name: 'index', hash: '#demo' }" role="menuitem">
              {{ $t('liveDemo') }}
            </NuxtLink>
          </li>

          <li class="nav-item" role="presentation">
            <NuxtLink
              class="nav-link"
              :to="{ name: 'index', hash: '#documentation' }"
              role="menuitem"
            >
              {{ $t('documentation') }}
            </NuxtLink>
          </li>

          <li class="nav-item" role="presentation">
            <a
              class="nav-link"
              :href="appConfig.library.licenseUrl"
              target="_blank"
              role="menuitem"
            >
              {{ $t('library.license') }}
            </a>
          </li>

          <li class="nav-item dropdown" role="presentation">
            <a
              id="navbar-dropdown-links"
              class="nav-link dropdown-toggle"
              href="#"
              data-bs-toggle="dropdown"
              role="menuitem"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {{ $t('library.links') }}
            </a>

            <div class="dropdown-menu" aria-labelledby="navbar-dropdown-links" role="menu">
              <a
                class="dropdown-item"
                :href="appConfig.library.apiSpecificationUrl"
                target="_blank"
                role="menuitem"
              >
                {{ $t('documentation.apiSpec') }}
              </a>

              <a
                class="dropdown-item"
                :href="appConfig.library.gitHubUrl"
                target="_blank"
                role="menuitem"
              >
                <span aria-hidden="true" class="logo-icon logo-icon-github"></span>
                GitHub
              </a>

              <a
                class="dropdown-item"
                :href="appConfig.library.npmUrl"
                target="_blank"
                role="menuitem"
              >
                <span aria-hidden="true" class="logo-icon logo-icon-npm"></span>
                NPM
              </a>

              <a
                class="dropdown-item"
                :href="appConfig.library.dockerHubUrl"
                target="_blank"
                role="menuitem"
              >
                <span aria-hidden="true" class="logo-icon logo-icon-docker"></span>
                Docker Hub <span class="badge bg-primary">{{ $t('new') }}</span>
              </a>
            </div>
          </li>

          <li class="nav-item dropdown" role="presentation">
            <a
              id="navbar-dropdown-feedback"
              class="nav-link dropdown-toggle"
              href="#"
              data-bs-toggle="dropdown"
              role="menuitem"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {{ $t('feedback') }}
            </a>

            <div class="dropdown-menu" aria-labelledby="navbar-dropdown-feedback" role="menu">
              <a
                class="dropdown-item"
                :href="appConfig.library.issuesUrl"
                target="_blank"
                role="menuitem"
              >
                {{ $t('library.issueReport') }} <GithubIssueCount />
              </a>

              <ModalButton class="dropdown-item" role="menuitem" modal-id="contact-us-modal">
                {{ $t('contactUs') }}
              </ModalButton>

              <ModalButton class="dropdown-item" role="menuitem" modal-id="about-modal">
                {{ $t('aboutUs') }}
              </ModalButton>
            </div>
          </li>

          <li class="nav-item dropdown" role="presentation">
            <a
              id="navbar-dropdown-locale"
              class="nav-link dropdown-toggle"
              href="#"
              data-bs-toggle="dropdown"
              role="menuitem"
              aria-haspopup="true"
              aria-expanded="false"
              :title="$t('website.language')"
            >
              {{ getLocaleEmoji($i18n.locale) }}
              {{ $i18n.locale }}
            </a>

            <div class="dropdown-menu" aria-labelledby="navbar-dropdown-locale" role="menu">
              <a
                v-for="locale of $i18n.availableLocales"
                :key="locale"
                class="dropdown-item"
                :href="buildPageUrl(locale === 'uk-UA' ? '/' : `/${locale}`)"
                role="menuitem"
              >
                {{ getLocaleEmoji(locale) }}
                {{ $t(`website.locale.${locale}`) }} ({{ locale }})
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.navbar-brand {
  width: 50px;
  height: 50px;
  padding: 0;
}

.navbar-logo {
  height: 100%;
  margin-right: 10px;
}

.logo-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  background-size: 100%;
  background-position: center center;
  background-repeat: no-repeat;

  &-npm {
    background-image: url('~/assets/img/npm.svg');
  }

  &-github {
    background-image: url('~/assets/img/github.svg');
  }

  &-docker {
    background-image: url('~/assets/img/docker.svg');
    background-position: bottom;
  }
}
</style>
