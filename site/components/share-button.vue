<script setup lang="ts">
import { computed } from 'vue';
import { useClipboard, useMounted, useShare } from '@vueuse/core';
import { useAbsoluteUrl } from '~/composables/absolute-url';

const { absoluteUrl } = useAbsoluteUrl();

const isMounted = useMounted();
const { share, isSupported: isShareSupported } = useShare();
const isNativeShareAvailable = computed(() => isMounted.value && isShareSupported.value);

async function shareNatively() {
  try {
    await share({ title: document.title, url: absoluteUrl.value });
  } catch (error) {
    if (!(error instanceof DOMException && error.name === 'AbortError')) {
      throw error;
    }
  }
}

const { copy, copied } = useClipboard({
  source: absoluteUrl,
  legacy: true,
});

const viberShareLink = computed(() => {
  const shareLink = new URL('viber://forward');
  shareLink.searchParams.set('text', absoluteUrl.value);
  return shareLink.toString();
});

const whatsAppShareLink = computed(() => {
  const shareLink = new URL('https://wa.me');
  shareLink.searchParams.set('text', absoluteUrl.value);
  return shareLink.toString();
});

const threadsShareLink = computed(() => {
  const shareLink = new URL('https://www.threads.com');
  shareLink.pathname = '/intent/post';
  shareLink.searchParams.set('text', absoluteUrl.value);
  return shareLink.toString();
});

const facebookShareLink = computed(() => {
  const shareLink = new URL('https://www.facebook.com');
  shareLink.pathname = '/sharer/sharer.php';
  shareLink.searchParams.set('u', absoluteUrl.value);
  return shareLink.toString();
});

function shareByEmail() {
  const subject = encodeURIComponent(document.title);
  const body = encodeURIComponent(absoluteUrl.value);
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
}
</script>

<template>
  <div class="btn-group">
    <button
      v-if="isNativeShareAvailable"
      type="button"
      class="btn btn-light"
      @click="shareNatively()"
    >
      <i class="fa-solid fa-share-nodes me-1" aria-hidden="true"></i>
      {{ $t('action.share') }}
    </button>

    <button
      type="button"
      class="btn btn-light dropdown-toggle"
      :class="{ 'dropdown-toggle-split': isNativeShareAvailable }"
      data-bs-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <span v-if="isNativeShareAvailable" class="visually-hidden">
        {{ $t('socialShare.moreOptions') }}
      </span>
      <template v-else>
        <i class="fa-solid fa-share-nodes me-1" aria-hidden="true"></i>
        {{ $t('action.share') }}
      </template>
    </button>

    <div class="dropdown-menu dropdown-menu-end" role="menu">
      <button type="button" class="dropdown-item" role="menuitem" @click.stop="copy()">
        <i v-if="copied" class="fa-solid fa-check text-success me-1" aria-hidden="true"></i>
        <i v-else class="fa-solid fa-link text-primary me-1" aria-hidden="true"></i>
        {{ copied ? $t('socialShare.linkCopied') : $t('action.copyLink') }}
      </button>

      <hr class="dropdown-divider" />

      <a class="dropdown-item" :href="viberShareLink" role="menuitem">
        <i class="fa-brands fa-viber color-viber me-1" aria-hidden="true"></i>
        Viber
      </a>

      <a class="dropdown-item" :href="whatsAppShareLink" target="_blank" role="menuitem">
        <i class="fa-brands fa-whatsapp color-whatsapp me-1" aria-hidden="true"></i>
        WhatsApp <NewTabHint />
      </a>

      <a class="dropdown-item" :href="threadsShareLink" target="_blank" role="menuitem">
        <i class="fa-brands fa-threads me-1" aria-hidden="true"></i>
        Threads <NewTabHint />
      </a>

      <a class="dropdown-item" :href="facebookShareLink" target="_blank" role="menuitem">
        <i class="fa-brands fa-facebook color-facebook me-1" aria-hidden="true"></i>
        Facebook <NewTabHint />
      </a>

      <button type="button" class="dropdown-item" role="menuitem" @click="shareByEmail()">
        <i class="fa-solid fa-envelope text-primary me-1" aria-hidden="true"></i>
        {{ $t('socialShare.email') }}
      </button>
    </div>
  </div>
</template>
