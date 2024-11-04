<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAbsoluteUrl } from '~/composables/absolute-url';

defineProps({
  buttonsClass: { type: String, default: null },
});

const { t: $t } = useI18n();
const { absoluteUrl } = useAbsoluteUrl();

const facebookShareLink = computed(() => {
  const shareLink = new URL('https://www.facebook.com');
  shareLink.pathname = '/sharer/sharer.php';
  shareLink.searchParams.set('u', absoluteUrl.value);
  return shareLink.toString();
});

const twitterShareLink = computed(() => {
  const shareLink = new URL('https://twitter.com');
  shareLink.pathname = '/home';
  shareLink.searchParams.set('status', absoluteUrl.value);
  return shareLink.toString();
});

const linkedInShareLink = computed(() => {
  const shareLink = new URL('https://www.linkedin.com');
  shareLink.pathname = '/shareArticle';
  shareLink.searchParams.set('mini', String(true));
  shareLink.searchParams.set('url', absoluteUrl.value);
  shareLink.searchParams.set('title', '');
  shareLink.searchParams.set('summary', $t('app.name'));
  shareLink.searchParams.set('source', '');
  return shareLink.toString();
});
</script>

<template>
  <div class="btn-group" :class="buttonsClass" role="menubar">
    <CopyButton
      :source="absoluteUrl"
      button-class="btn btn-lg btn-link btn-share"
      :button-title="$t('action.copyLink')"
      icon-class="fa fa-link"
    />

    <a
      class="btn btn-lg btn-link btn-share"
      :href="facebookShareLink"
      :title="$t('socialShare.facebook')"
      target="_blank"
      role="menuitem"
    >
      <i class="fa fa-facebook color-facebook" aria-hidden="true"></i>
    </a>

    <a
      class="btn btn-lg btn-link btn-share"
      :href="twitterShareLink"
      :title="$t('socialShare.twitter')"
      target="_blank"
      role="menuitem"
    >
      <i class="fa fa-twitter color-twitter" aria-hidden="true"></i>
    </a>

    <a
      class="btn btn-lg btn-link btn-share"
      :href="linkedInShareLink"
      :title="$t('socialShare.linkedIn')"
      target="_blank"
      role="menuitem"
    >
      <i class="fa fa-linkedin color-linkedin" aria-hidden="true"></i>
    </a>
  </div>
</template>

<style lang="scss" scoped>
.btn-share {
  margin: 0 0.75em;
  padding: 0;
  border: 0;
  text-align: center;

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }
}

.color {
  &-facebook {
    color: #4867aa;
  }

  &-twitter {
    color: #1da1f2;
  }

  &-linkedin {
    color: #0077b5;
  }
}
</style>
