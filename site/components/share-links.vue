<script setup lang="ts">
import { computed } from 'vue';
import { useAbsoluteUrl } from '~/composables/absolute-url';

defineProps({
  buttonsClass: { type: String, default: null },
});

const { absoluteUrl } = useAbsoluteUrl();

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

const facebookShareLink = computed(() => {
  const shareLink = new URL('https://www.facebook.com');
  shareLink.pathname = '/sharer/sharer.php';
  shareLink.searchParams.set('u', absoluteUrl.value);
  return shareLink.toString();
});
</script>

<template>
  <div class="btn-group" :class="buttonsClass" role="menubar">
    <span v-if="$slots.default" class="btn btn-light pe-none text-muted">
      <slot />
    </span>

    <CopyButton
      :source="absoluteUrl"
      button-class="btn btn-light text-primary"
      :button-title="$t('action.copyLink')"
      icon-class="fa fa-link"
    />

    <a
      class="btn btn-light"
      :href="viberShareLink"
      :title="$t('socialShare.viber')"
      role="menuitem"
    >
      <img class="icon" src="~/assets/img/viber.svg" alt="" aria-hidden="true" />
    </a>

    <a
      class="btn btn-light"
      :href="whatsAppShareLink"
      :title="$t('socialShare.whatsApp')"
      target="_blank"
      role="menuitem"
    >
      <i class="fa fa-whatsapp color-whatsapp" aria-hidden="true"></i>
    </a>

    <a
      class="btn btn-light"
      :href="facebookShareLink"
      :title="$t('socialShare.facebook')"
      target="_blank"
      role="menuitem"
    >
      <i class="fa fa-facebook color-facebook" aria-hidden="true"></i>
    </a>
  </div>
</template>

<style lang="scss" scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.125em;
}

.color {
  &-whatsapp {
    color: #25d366;
  }

  &-facebook {
    color: #4867aa;
  }
}
</style>
