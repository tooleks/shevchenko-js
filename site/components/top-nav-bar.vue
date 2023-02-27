<script setup lang="ts">
import { useRouteUtils } from '~/composables/route-utils';

const appConfig = useAppConfig();
const { buildPageUrl } = useRouteUtils();
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" :href="appConfig.website.url">
      <img
        class="navbar-brand__logo"
        src="~/assets/img/shevchenko_pixelized_304x304.jpg"
        :alt="appConfig.library.name"
      />
      <span class="hidden-sm">{{ appConfig.library.name }}</span>
    </a>

    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbar-supported-content"
      aria-controls="navbar-supported-content"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbar-supported-content">
      <ul class="navbar-nav mt-2 mt-lg-0 ml-auto" role="menubar">
        <li class="nav-item" role="presentation">
          <NuxtLink class="nav-link" :to="{ hash: '#demo' }" role="menuitem">
            {{ $t('demo') }}
          </NuxtLink>
        </li>

        <li class="nav-item" role="presentation">
          <NuxtLink class="nav-link" :to="{ hash: '#documentation' }" role="menuitem">
            {{ $t('documentation') }}
          </NuxtLink>
        </li>

        <li class="nav-item" role="presentation">
          <a class="nav-link" :href="appConfig.library.licenseUrl" target="_blank" role="menuitem">
            {{ $t('license') }}
          </a>
        </li>

        <li class="nav-item dropdown" role="presentation">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbar-dropdown-links"
            data-toggle="dropdown"
            role="menuitem"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {{ $t('links') }}
          </a>

          <div class="dropdown-menu" aria-labelledby="navbar-dropdown-links" role="menu">
            <a
              class="dropdown-item"
              :href="appConfig.library.apiSpecUrl"
              target="_blank"
              role="menuitem"
            >
              {{ $t('apiSpec') }}
            </a>

            <a
              class="dropdown-item"
              :href="appConfig.library.wikiUrl"
              target="_blank"
              role="menuitem"
            >
              Wiki
            </a>

            <a
              class="dropdown-item"
              :href="appConfig.library.gitHubUrl"
              target="_blank"
              role="menuitem"
            >
              GitHub
            </a>

            <a
              class="dropdown-item"
              :href="appConfig.library.npmUrl"
              target="_blank"
              role="menuitem"
            >
              NPM
            </a>

            <a
              class="dropdown-item"
              :href="appConfig.library.runKitUrl"
              target="_blank"
              role="menuitem"
            >
              RunKit
            </a>
          </div>
        </li>

        <li class="nav-item dropdown" role="presentation">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbar-dropdown-feedback"
            data-toggle="dropdown"
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
              {{ $t('issueReport') }} <GithubIssueCount />
            </a>

            <ContactMeButton button-class="dropdown-item" role="menuitem">
              {{ $t('action.contactMe') }}
            </ContactMeButton>
          </div>
        </li>

        <li class="nav-item dropdown" role="presentation">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbar-dropdown-locale"
            data-toggle="dropdown"
            role="menuitem"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fa fa-globe" aria-hidden="true"></i>
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
              {{ $t(`locale.${locale}`) }} ({{ locale }})
            </a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.navbar-brand {
  padding: 0;

  &__logo {
    display: inline;
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
}
</style>
