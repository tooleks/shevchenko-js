<script setup lang="ts">
import { useAnnouncer } from '~/composables/announcer';

const { message: announcement } = useAnnouncer();
</script>

<template>
  <div class="site">
    <SiteHeader />
    <main>
      <slot />
    </main>
    <SiteFooter />
    <AboutModal />
    <ContactUsModal />
    <div class="visually-hidden" aria-live="polite" aria-atomic="true">{{ announcement }}</div>
  </div>
</template>
