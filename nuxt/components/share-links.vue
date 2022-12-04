<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouteUtils } from '~/composables/route-utils';

defineProps({
  buttonsClass: { type: String, default: null },
});

const { t: $t } = useI18n();
const { pageUrl } = useRouteUtils();

const pageShareLink = computed(() => pageUrl.value);

const facebookShareLink = computed(() => {
  const shareLink = new URL('https://www.facebook.com');
  shareLink.pathname = '/sharer/sharer.php';
  shareLink.searchParams.set('u', pageShareLink.value);
  return shareLink.toString();
});

const twitterShareLink = computed(() => {
  const shareLink = new URL('https://twitter.com');
  shareLink.pathname = '/home';
  shareLink.searchParams.set('status', pageShareLink.value);
  return shareLink.toString();
});

const linkedInShareLink = computed(() => {
  const shareLink = new URL('https://www.linkedin.com');
  shareLink.pathname = '/shareArticle';
  shareLink.searchParams.set('mini', true.toString());
  shareLink.searchParams.set('url', pageShareLink.value);
  shareLink.searchParams.set('title', '');
  shareLink.searchParams.set('summary', $t('app.name').toString());
  shareLink.searchParams.set('source', '');
  return shareLink.toString();
});
</script>

<template>
  <div class="btn-group" :class="buttonsClass" role="menubar">
    <CopyButton
      :source="pageShareLink"
      button-class="btn btn-lg btn-link btn--share"
      :button-title="$t('action.copyLink')"
      icon-class="fa fa-link"
    />

    <a
      class="btn btn-lg btn-link btn--share"
      :href="facebookShareLink"
      :title="$t('action.share.onFacebook')"
      target="_blank"
      role="menuitem"
    >
      <i class="fa fa-facebook fa-facebook--branded" aria-hidden="true"></i>
    </a>

    <a
      class="btn btn-lg btn-link btn--share"
      :href="twitterShareLink"
      :title="$t('action.share.onTwitter')"
      target="_blank"
      role="menuitem"
    >
      <i class="fa fa-twitter fa-twitter--branded" aria-hidden="true"></i>
    </a>

    <a
      class="btn btn-lg btn-link btn--share"
      :href="linkedInShareLink"
      :title="$t('action.share.onLinkedIn')"
      target="_blank"
      role="menuitem"
    >
      <i class="fa fa-linkedin fa-linkedin--branded" aria-hidden="true"></i>
    </a>
  </div>
</template>

<style lang="scss" scoped>
.btn {
  &--share {
    width: 45px;
    border: 0;
    text-align: center;
  }
}

.fa-facebook {
  &--branded {
    color: #4867aa;
  }
}

.fa-twitter {
  &--branded {
    color: #1da1f2;
  }
}

.fa-linkedin {
  &--branded {
    color: #0077b5;
  }
}
</style>
