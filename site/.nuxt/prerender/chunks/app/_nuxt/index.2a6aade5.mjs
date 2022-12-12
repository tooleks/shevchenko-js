import { u as usePageMeta, a as useRouteUtils, b as useHead } from './page-meta.5c83eea4.mjs';
import { useSSRContext, computed } from 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/vue/index.mjs';
import { useI18n } from 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/vue-i18n/index.mjs';
import { _ as _sfc_main$1, u as usePageI18n } from './index.2e215246.mjs';
import '../server.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/ofetch/dist/node.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/hookable/dist/index.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/unctx/dist/index.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/ufo/dist/index.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/h3/dist/index.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/@unhead/vue/dist/index.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/@unhead/dom/dist/index.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/vue-router/dist/vue-router.node.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/vue/server-renderer/index.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/defu/dist/defu.mjs';
import '../../nitro/nitro-prerenderer.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/node-fetch-native/dist/polyfill.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/destr/dist/index.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/unenv/runtime/fetch/index.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/scule/dist/index.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/ohash/dist/index.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/unstorage/dist/index.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/unstorage/dist/drivers/fs.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/radix3/dist/index.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/nitropack/dist/runtime/plugin.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/shevchenko/dist/cjs/shevchenko.js';

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

export { _sfc_main as default };
//# sourceMappingURL=index.2a6aade5.mjs.map
