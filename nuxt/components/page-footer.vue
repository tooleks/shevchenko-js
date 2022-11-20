<script setup>
import { computed } from 'vue';
import { useNow } from '@vueuse/core';

const appConfig = useAppConfig();
const currentTime = useNow();
const currentYear = computed(() => currentTime.value.getFullYear());
</script>

<template>
  <div class="row">
    <div class="col-12">
      <hr />
      <nav>
        <ul class="list-unstyled" role="menubar">
          <p class="d-inline mr-2 mb-0">
            &copy; {{ appConfig.library.releaseYear }}-{{ currentYear }}
            {{ appConfig.library.name }}
          </p>

          <li class="d-inline mr-2" role="presentation">
            <a :href="appConfig.library.npmUrl" target="_blank" role="menuitem">NPM</a>
          </li>

          <li class="d-inline mr-2" role="presentation">
            <a :href="appConfig.library.gitHubUrl" target="_blank" role="menuitem">GitHub</a>
          </li>

          <li class="d-inline mr-2" role="presentation">
            <ContactMeButton role="menuitem">
              {{ $t('action.contactMe') }}
            </ContactMeButton>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
