<script setup lang="ts">
const appConfig = useAppConfig();
</script>

<template>
  <section id="footer">
    <hr />

    <div class="row mb-1">
      <div class="col-12">
        <ul class="list-unstyled mb-0" role="menubar">
          <li class="d-inline mr-2" role="presentation">
            <span class="text-muted">
              {{ `${appConfig.library.displayName} v${appConfig.library.version}` }}
            </span>
          </li>

          <li class="d-inline mr-2" role="presentation">
            <a :href="appConfig.library.gitHubUrl" target="_blank" role="menuitem">GitHub</a>
          </li>

          <li class="d-inline mr-2" role="presentation">
            <a :href="appConfig.library.npmUrl" target="_blank" role="menuitem">NPM</a>
          </li>

          <li class="d-inline mr-2" role="presentation">
            <ModalButton class="btn btn-link p-0" role="menuitem" modal-id="contact-us-modal">
              {{ $t('contactUs') }}
            </ModalButton>
          </li>

          <li class="d-inline" role="presentation">
            <ModalButton class="btn btn-link p-0" role="menuitem" modal-id="about-modal">
              {{ $t('aboutUs') }}
            </ModalButton>
          </li>
        </ul>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-12">
        {{ appConfig.website.copyright }}
      </div>
    </div>
  </section>
</template>
