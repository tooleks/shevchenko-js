<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const runtimeConfig = useRuntimeConfig();
const appConfig = useAppConfig();
const { t: $t } = useI18n();

const mailtoUrl = computed(() => {
  const url = new URL(`mailto:${runtimeConfig.public.siteEmail}`);
  url.searchParams.set(
    'subject',
    $t('contactUs.messageSubject', { appName: appConfig.library.displayName }),
  );
  return url.toString();
});
</script>

<template>
  <div
    id="contact-us-modal"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="contact-me-label"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h2 id="contact-me-label" class="modal-title h5">
            {{ $t('contactUs') }}
          </h2>

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            :aria-label="$t('action.close')"
          ></button>
        </div>

        <div class="modal-body">
          <p>
            {{ $t('contactUs.message') }}
          </p>

          <div class="input-group mb-3">
            <input
              :value="runtimeConfig.public.siteEmail"
              readonly
              type="email"
              class="form-control"
              :aria-label="$t('contactUs.recipientEmail')"
            />
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            {{ $t('action.close') }}
          </button>

          <a target="_blank" :href="mailtoUrl" class="btn btn-primary">
            <i aria-hidden="true" class="fa fa-paper-plane"></i> {{ $t('action.write') }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
