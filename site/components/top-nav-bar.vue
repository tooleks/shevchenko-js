<script setup lang="ts">
import { useRouteUtils } from '~/composables/route-utils';
import { useLocaleEmoji } from '~/composables/locale-country-code';

const appConfig = useAppConfig();
const { buildPageUrl } = useRouteUtils();
const { getLocaleEmoji } = useLocaleEmoji();
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" :href="appConfig.website.url">
      <img
        class="navbar-brand__logo"
        src="~/assets/img/shevchenko_pixelized_304x304.jpg"
        :alt="appConfig.library.displayName"
      />
      <span class="hidden-sm">{{ appConfig.library.displayName }}</span>
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

    <div id="navbar-supported-content" class="collapse navbar-collapse">
      <ul class="navbar-nav mt-2 mt-lg-0 ml-auto" role="menubar">
        <li class="nav-item" role="presentation">
          <NuxtLink class="nav-link" :to="{ hash: '#demo' }" role="menuitem">
            {{ $t('liveDemo') }}
          </NuxtLink>
        </li>

        <li class="nav-item" role="presentation">
          <NuxtLink class="nav-link" :to="{ hash: '#documentation' }" role="menuitem">
            {{ $t('documentation') }}
          </NuxtLink>
        </li>

        <li class="nav-item" role="presentation">
          <a class="nav-link" :href="appConfig.library.licenseUrl" target="_blank" role="menuitem">
            {{ $t('library.license') }}
          </a>
        </li>

        <li class="nav-item dropdown" role="presentation">
          <a
            id="navbar-dropdown-links"
            class="nav-link dropdown-toggle"
            href="#"
            data-toggle="dropdown"
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
          </div>
        </li>

        <li class="nav-item dropdown" role="presentation">
          <a
            id="navbar-dropdown-feedback"
            class="nav-link dropdown-toggle"
            href="#"
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
            data-toggle="dropdown"
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
