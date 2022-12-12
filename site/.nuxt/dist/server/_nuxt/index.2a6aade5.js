import { u as usePageMeta, c as useRouteUtils, a as useHead } from "./page-meta.5c83eea4.js";
import { useSSRContext, computed } from "vue";
import { useI18n } from "vue-i18n";
import { _ as _sfc_main$1, u as usePageI18n } from "./index.2e215246.js";
import "../server.mjs";
import "ofetch";
import "#internal/nitro";
import "hookable";
import "unctx";
import "destr";
import "ufo";
import "h3";
import "@unhead/vue";
import "@unhead/dom";
import "vue-router";
import "vue/server-renderer";
import "defu";
import "ohash";
import "shevchenko";
function setup(...args) {
  const setupResult = _sfc_main$1.setup.call(this, ...args);
  usePageI18n({
    locale: "en-US"
  });
  const { t: $t } = useI18n();
  const { buildPageTitle } = usePageMeta();
  const pageTitle = computed(() => {
    const title = $t("app.name").toString();
    return buildPageTitle(title);
  });
  const { buildPageUrl } = useRouteUtils();
  useHead({
    title: pageTitle,
    link: [
      { rel: "canonical", href: buildPageUrl("/en-US") }
    ]
  });
  return setupResult;
}
const _sfc_main = { ..._sfc_main$1, setup };
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/en-US/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index.2a6aade5.js.map
