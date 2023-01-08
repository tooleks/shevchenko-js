<script setup lang="ts">
import { watch } from 'vue';

const appConfig = useAppConfig();
const route = useRoute();

watch(
  () => route.hash,
  (hash) => {
    if (hash === '#about') {
      $('#about-modal').modal('show');
    }
  },
);
</script>

<template>
  <div
    id="about-modal"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="about-label"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 id="about-label" class="modal-title">
            {{ $t('about.modalTitle', { appName: appConfig.library.name }) }}
          </h4>

          <button type="button" class="close" data-dismiss="modal" :aria-label="$t('action.close')">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body">
          <p>
            {{ $t('about.modalMessage') }}
          </p>
        </div>

        <div class="modal-footer">
          <nav>
            <ul class="list-unstyled mb-0" role="menubar">
              <p class="d-inline mr-2 mb-0">
                <PageCopyright />
              </p>

              <p class="d-inline mr-2 mb-0">
                <ContactMeButton data-dismiss="modal" button-class="btn btn-link p-0">
                  {{ $t('action.contactMe') }}
                </ContactMeButton>
              </p>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
