<script setup lang="ts">
import { computed } from 'vue';

const appConfig = useAppConfig();
const runtimeConfig = useRuntimeConfig();
const currentTime = useNow({ interval: 60_000 });

const currentYear = computed(() => currentTime.value.getFullYear());
const siteName = computed(() => {
  const siteUrl = new URL(runtimeConfig.public.siteUrl);
  return siteUrl.hostname;
});
</script>

<template>
  <section id="footer">
    <div class="row mb-1">
      <div class="col-12">
        <ul class="list-unstyled mb-0" role="menubar">
          <li class="d-block mb-1 d-md-inline me-md-3 mb-md-0" role="presentation">
            <span class="text-muted">
              {{ `${appConfig.library.displayName} v${appConfig.library.version}` }}
            </span>
          </li>

          <li class="d-inline align-middle me-2" role="presentation">
            <a
              :href="appConfig.library.gitHubUrl"
              class="text-decoration-none"
              target="_blank"
              role="menuitem"
            >
              <span aria-hidden="true" class="logo-icon logo-icon-github"></span>
              GitHub
            </a>
          </li>

          <li class="d-inline align-middle me-2" role="presentation">
            <a
              :href="appConfig.library.npmUrl"
              class="text-decoration-none"
              target="_blank"
              role="menuitem"
            >
              <span aria-hidden="true" class="logo-icon logo-icon-npm"></span>
              NPM
            </a>
          </li>

          <li class="d-inline align-middle me-2" role="presentation">
            <a
              :href="appConfig.library.dockerHubUrl"
              class="text-decoration-none"
              target="_blank"
              role="menuitem"
            >
              <span aria-hidden="true" class="logo-icon logo-icon-docker"></span>
              Docker Hub <span class="badge bg-primary">{{ $t('new') }}</span>
            </a>
          </li>

          <li class="d-inline me-2" role="presentation">
            <ModalButton
              class="btn btn-link text-decoration-none p-0"
              role="menuitem"
              modal-id="contact-us-modal"
            >
              {{ $t('contactUs') }}
            </ModalButton>
          </li>

          <li class="d-inline" role="presentation">
            <ModalButton
              class="btn btn-link text-decoration-none p-0"
              role="menuitem"
              modal-id="about-modal"
            >
              {{ $t('aboutUs') }}
            </ModalButton>
          </li>
        </ul>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-12">&copy; 2017-{{ currentYear }} {{ siteName }}</div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.logo-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  background-size: 100%;
  background-position: center;
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
