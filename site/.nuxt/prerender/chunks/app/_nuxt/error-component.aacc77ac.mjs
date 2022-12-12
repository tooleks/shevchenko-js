import { b as __nuxt_component_0, _ as _export_sfc, a as __nuxt_component_0$1 } from '../server.mjs';
import { u as usePageMeta, b as useHead, _ as __nuxt_component_1, e as _sfc_main$2 } from './page-meta.5c83eea4.mjs';
import { defineComponent, computed, mergeProps, withCtx, createVNode, useSSRContext, createTextVNode, toDisplayString } from 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/vue/index.mjs';
import { ssrRenderComponent, ssrRenderAttrs, ssrInterpolate } from 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/vue/server-renderer/index.mjs';
import { useI18n } from 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/vue-i18n/index.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/ofetch/dist/node.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/hookable/dist/index.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/unctx/dist/index.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/ufo/dist/index.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/h3/dist/index.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/@unhead/vue/dist/index.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/@unhead/dom/dist/index.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/vue-router/dist/vue-router.node.mjs';
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

const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "jumbotron my-3" }, _attrs))}><h1 class="text-truncate">${ssrInterpolate(_ctx.$t("error404.pageTitle"))}</h1><p>${ssrInterpolate(_ctx.$t("error404.instructionMessage"))}</p>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: { name: "index" },
    class: "btn btn-primary"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`${ssrInterpolate(_ctx.$t("action.backToHome"))}`);
      } else {
        return [
          createTextVNode(toDisplayString(_ctx.$t("action.backToHome")), 1)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/error-404.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "error",
  __ssrInlineRender: true,
  setup(__props) {
    const { t: $t } = useI18n();
    const { buildPageTitle } = usePageMeta();
    const pageTitle = computed(() => {
      const title = $t("error404.pageTitle").toString();
      return buildPageTitle(title);
    });
    useHead({
      title: pageTitle
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_PageHeader = __nuxt_component_1;
      const _component_Error404 = __nuxt_component_2;
      const _component_PageFooter = _sfc_main$2;
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "default" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_PageHeader, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Error404, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_PageFooter, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_PageHeader),
              createVNode(_component_Error404),
              createVNode(_component_PageFooter)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("error.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=error-component.aacc77ac.mjs.map
