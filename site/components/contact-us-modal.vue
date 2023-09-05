<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const appConfig = useAppConfig();
const { t: $t } = useI18n();

const mailtoUrl = computed(() => {
  const url = new URL(`mailto:${appConfig.website.email}`);
  url.searchParams.set('subject', $t('contactUs.messageSubject').toString());
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
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 id="contact-me-label" class="modal-title">
            {{ $t('contactUs') }}
          </h4>

          <button type="button" class="close" data-dismiss="modal" :aria-label="$t('action.close')">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body">
          <p>
            {{ $t('contactUs.message') }}
          </p>

          <div class="input-group mb-3">
            <input
              :value="appConfig.website.email"
              readonly
              type="email"
              class="form-control"
              :aria-label="$t('contactUs.recipientEmail')"
            />
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
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
