<script setup lang="ts">
import { computed, watch, onMounted } from 'vue';
import $ from 'jquery';

const appConfig = useAppConfig();
const route = useRoute();

const isAboutLink = computed(() => route.hash === '#about');

function showAboutModal(): void {
  if (isAboutLink.value) {
    $('#about-modal').modal('show');
  }
}

onMounted(() => showAboutModal());
watch(isAboutLink, () => showAboutModal());
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
      </div>
    </div>
  </div>
</template>
