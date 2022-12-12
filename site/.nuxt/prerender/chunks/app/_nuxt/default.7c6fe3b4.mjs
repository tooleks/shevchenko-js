import { mergeProps, useSSRContext } from 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderSlot } from 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/vue/server-renderer/index.mjs';
import { _ as _export_sfc } from '../server.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/ofetch/dist/node.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/hookable/dist/index.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/unctx/dist/index.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/ufo/dist/index.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/h3/dist/index.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/@unhead/vue/dist/index.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/@unhead/dom/dist/index.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/vue-router/dist/vue-router.node.mjs';
import 'file:///home/tooleks/Projects/shevchenko-js/site/node_modules/vue-i18n/index.mjs';
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

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _default as default };
//# sourceMappingURL=default.7c6fe3b4.mjs.map
