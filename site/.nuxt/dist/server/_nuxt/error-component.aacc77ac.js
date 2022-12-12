import { _ as _export_sfc, a as __nuxt_component_0, b as __nuxt_component_0$1 } from "../server.mjs";
import { u as usePageMeta, a as useHead, _ as __nuxt_component_1, b as _sfc_main$2 } from "./page-meta.5c83eea4.js";
import { mergeProps, withCtx, createTextVNode, toDisplayString, useSSRContext, defineComponent, computed, createVNode } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { useI18n } from "vue-i18n";
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
import "defu";
import "ohash";
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0;
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
      const _component_NuxtLayout = __nuxt_component_0$1;
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
export {
  _sfc_main as default
};
//# sourceMappingURL=error-component.aacc77ac.js.map
