<script setup lang="ts">
import { computed, watch, onMounted } from 'vue';
import * as bootstrap from 'bootstrap';

const route = useRoute();

const isAboutLink = computed(() => route.hash === '#about');

function autoShowAboutModal(): void {
  if (isAboutLink.value) {
    showAboutModal();
  }
}

function showAboutModal(): void {
  const modal = new bootstrap.Modal('#about-modal');
  modal.show();
}

function hideAboutModal(): void {
  const modal = new bootstrap.Modal('#about-modal');
  modal.hide();
}

onMounted(() => autoShowAboutModal());
watch(isAboutLink, () => autoShowAboutModal());
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
          <h5 id="about-label" class="modal-title">
            {{ $t('aboutUs') }}
          </h5>

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
              <h5 class="mb-1">{{ $t('aboutUs.author1') }}</h5>
              <p class="mb-1">{{ $t('aboutUs.author1.responsibility') }}</p>
            </span>

            <span class="list-group-item flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{{ $t('aboutUs.author2') }}</h5>
                <ModalButton
                  modal-id="contact-us-modal"
                  :aria-label="$t('action.write')"
                  :title="$t('action.write')"
                  @click="hideAboutModal"
                >
                  <i aria-hidden="true" class="fa fa-envelope"></i>
                </ModalButton>
              </div>
              <p class="mb-1">{{ $t('aboutUs.author2.responsibility') }}</p>
            </span>

            <span class="list-group-item flex-column align-items-start">
              <h5 class="mb-1">{{ $t('aboutUs.author3') }}</h5>
              <p class="mb-1">{{ $t('aboutUs.author3.responsibility') }}</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
