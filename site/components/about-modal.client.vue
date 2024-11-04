<script setup lang="ts">
import { computed, watch, onMounted } from 'vue';
import * as bootstrap from 'bootstrap';
import { querySelectorUntil } from '~/utils/dom';

const route = useRoute();

const isAboutUrl = computed(() => route.hash === '#about');

function autoShowAboutModal(): void {
  if (isAboutUrl.value) {
    showAboutModal();
  }
}

async function showAboutModal(): Promise<void> {
  const modalElement = await querySelectorUntil('#about-modal');
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
}

async function hideAboutModal(): Promise<void> {
  const modalElement = await querySelectorUntil('#about-modal');
  const modal = new bootstrap.Modal(modalElement);
  modal.hide();
}

onMounted(() => autoShowAboutModal());
watch(isAboutUrl, () => autoShowAboutModal());
</script>

<template>
  <div
    id="about-modal"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="about-label"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h2 id="about-label" class="modal-title h5">
            {{ $t('aboutUs') }}
          </h2>

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            :aria-label="$t('action.close')"
          ></button>
        </div>

        <div class="modal-body">
          <div class="alert alert-info" role="alert">
            {{ $t('aboutUs.tribute') }}
          </div>

          <div class="list-group">
            <span class="list-group-item list-group-item-light flex-column align-items-start">
              <p class="h5 mb-1">{{ $t('aboutUs.author1') }}</p>
              <p class="mb-1">{{ $t('aboutUs.author1.responsibility') }}</p>
            </span>

            <span class="list-group-item flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between">
                <p class="h5 mb-1">{{ $t('aboutUs.author2') }}</p>
                <ModalButton
                  modal-id="contact-us-modal"
                  :aria-label="$t('action.write')"
                  :title="$t('action.write')"
                  @click="hideAboutModal()"
                >
                  <i aria-hidden="true" class="fa fa-envelope"></i>
                </ModalButton>
              </div>
              <p class="mb-1">{{ $t('aboutUs.author2.responsibility') }}</p>
            </span>

            <span class="list-group-item flex-column align-items-start">
              <p class="h5 mb-1">{{ $t('aboutUs.author3') }}</p>
              <p class="mb-1">{{ $t('aboutUs.author3.responsibility') }}</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
