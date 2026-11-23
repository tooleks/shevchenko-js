<script setup lang="ts">
import { computed } from 'vue';
import { useAbsoluteUrl } from '~/composables/absolute-url';

const appConfig = useAppConfig();
const runtimeConfig = useRuntimeConfig();
const { getAbsoluteUrl } = useAbsoluteUrl();
const currentTime = useNow({ interval: 60_000 });

const currentYear = computed(() => currentTime.value.getFullYear());
const siteName = computed(() => {
  const siteUrl = new URL(runtimeConfig.public.siteUrl);
  return siteUrl.hostname;
});
</script>

<template>
  <footer class="site-footer">
    <div class="container">
      <div class="row gy-5">
        <div class="col-lg-5">
          <NuxtLink class="site-footer-brand" :to="{ name: 'index' }">
            <img
              src="~/assets/img/shevchenko_pixelized_304x304.jpg"
              alt=""
              width="40"
              height="40"
            />
            <span>{{ appConfig.library.displayName }}</span>
          </NuxtLink>

          <p class="site-footer-about">{{ $t('library.description') }}</p>
        </div>

        <nav class="col-6 col-md-4 col-lg-2 offset-lg-1" :aria-label="$t('footer.library')">
          <h2 class="site-footer-heading">{{ $t('footer.library') }}</h2>
          <ul class="site-footer-links">
            <li>
              <NuxtLink :to="{ name: 'index', hash: '#demo' }">{{ $t('liveDemo') }}</NuxtLink>
            </li>
            <li>
              <NuxtLink :to="{ name: 'index', hash: '#documentation' }">
                {{ $t('documentation') }}
              </NuxtLink>
            </li>
            <li>
              <a :href="getAbsoluteUrl(appConfig.library.apiSpecPath)" target="_blank">
                {{ $t('documentation.apiSpec') }} <NewTabHint />
              </a>
            </li>
            <li>
              <NuxtLink :to="{ name: 'military' }">{{ $t('forMilitary') }}</NuxtLink>
            </li>
            <li>
              <a :href="appConfig.library.licenseUrl" target="_blank"
                >{{ $t('library.license') }} <NewTabHint />
              </a>
            </li>
          </ul>
        </nav>

        <nav class="col-6 col-md-4 col-lg-2" :aria-label="$t('library.links')">
          <h2 class="site-footer-heading">{{ $t('library.links') }}</h2>
          <ul class="site-footer-links">
            <li>
              <a :href="appConfig.library.gitHubUrl" target="_blank">
                <i class="fa-brands fa-github" aria-hidden="true"></i> GitHub <NewTabHint />
              </a>
            </li>
            <li>
              <a :href="appConfig.library.npmUrl" target="_blank">
                <i class="fa-brands fa-npm" aria-hidden="true"></i> npm <NewTabHint />
              </a>
            </li>
            <li>
              <a :href="appConfig.library.dockerHubUrl" target="_blank">
                <i class="fa-brands fa-docker" aria-hidden="true"></i> Docker Hub <NewTabHint />
              </a>
            </li>
          </ul>
        </nav>

        <nav class="col-12 col-md-4 col-lg-2" :aria-label="$t('feedback')">
          <h2 class="site-footer-heading">{{ $t('feedback') }}</h2>
          <ul class="site-footer-links">
            <li>
              <a :href="appConfig.library.issuesUrl" target="_blank">
                {{ $t('library.issueReport') }} <GithubIssueCount /> <NewTabHint />
              </a>
            </li>
            <li>
              <ModalButton modal-id="contact-us-modal">{{ $t('footer.contactUs') }}</ModalButton>
            </li>
            <li>
              <ModalButton modal-id="about-modal">{{ $t('aboutUs') }}</ModalButton>
            </li>
          </ul>
        </nav>
      </div>

      <div class="site-footer-bottom">
        <span>&copy; 2017–{{ currentYear }} {{ siteName }}</span>
        <span>{{ `${appConfig.library.displayName} v${appConfig.library.version}` }}</span>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.site-footer {
  padding: 4rem 0 2rem;
  background: #0b1220;
  color: #94a3b8;
  font-size: 0.9375rem;
}

.site-footer-brand {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  color: #fff;
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  text-decoration: none;

  &:hover {
    color: #fff;
  }

  img {
    border-radius: 0.625rem;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.12);
  }
}

.site-footer-about {
  max-width: 24rem;
  margin: 1rem 0 0;
  line-height: 1.6;
}

.site-footer-heading {
  margin-bottom: 1rem;
  color: #e2e8f0;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.site-footer-links {
  display: grid;
  gap: 0.625rem;
  margin: 0;
  padding: 0;
  list-style: none;

  a {
    color: #94a3b8;
    text-decoration: none;
    transition: color 0.15s;

    &:hover,
    &:focus-visible {
      color: #fff;
    }
  }

  .badge {
    background: rgba(255, 255, 255, 0.1) !important;
    color: #e2e8f0;
    font-weight: 600;
  }
}

.site-footer-bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem 1.5rem;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  color: #8392a8;
  font-size: 0.875rem;
}
</style>
